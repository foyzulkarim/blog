#!/usr/bin/env bash
#
# Model router (POC). Prompt in, destination model id out.
#
#   ./router.sh "write a commit message"
#   ROUTER_SCHEMA=./other.json ./router.sh "..."   # A/B a criteria set
#   ROUTER_MIN_CONF=0.3 ./router.sh "..."          # stricter local gate
#
# router.json (next to this script) asks Laya two questions:
#   tier  - local | general | reasoning   (what kind of task)
#   scope - single | multi | system       (how much code it touches)
# The prompt is injected as "state". Edit the criteria there to change routing.
# Criteria can be a string or an array of short phrases. Arrays are joined
# into one comma-separated string before the request is sent.
#
# Routing rule: scope and low confidence can move the tier UP, never down.
#   - unknown tier            -> general
#   - local + low confidence  -> general
#   - local + multi scope     -> general
#   - any tier + system scope -> reasoning
#
# The final model id goes to stdout. Debug lines go to stderr.

set -euo pipefail

LOCAL_MODEL="local-9b"            # TODO: id you actually serve locally
GENERAL_MODEL="claude-sonnet-5-5"
REASONING_MODEL="claude-opus-5-5"

ENDPOINT="${ROUTER_ENDPOINT:-http://localhost:8888/v1/systemone}"  # your unsloth server

DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROMPT="${1:?usage: router.sh '<prompt>'}"
KEY="${UNSLOTH_API_KEY:?UNSLOTH_API_KEY is not set}"
SCHEMA_FILE="${ROUTER_SCHEMA:-${DIR}/router.json}"
MIN_CONF="${ROUTER_MIN_CONF:-0.2}"  # below this, a "local" pick is not trusted

log() { printf '%s\n' "$*" >&2; }

# --- Ask Laya ----------------------------------------------------------------

RESPONSE="$(curl --silent --show-error --fail "${ENDPOINT}" \
  --header "Authorization: Bearer ${KEY}" \
  --header "Content-Type: application/json" \
  --data-binary "$(jq --arg s "${PROMPT}" '
    .state = $s
    | .questions |= map_values(
        .criteria |= map_values(if type == "array" then join(", ") else . end)
      )' "${SCHEMA_FILE}")")"

# Response shape (confirmed live, tier only; scope follows the same shape):
#   {"model":"laya-multilingual",
#    "answers":{"tier":{"type":"choice","choice":"reasoning","confidence":0.17,
#              "probabilities":{"local":0.08,"general":0.39,"reasoning":0.53}}},
#    "usage":{"input_tokens":166,"output_tokens":0}}
#
# confidence is 1 - (entropy / ln N), i.e. how PEAKED the spread is, not how
# likely the choice is correct. 1.0 = one-hot, 0.0 = uniform. Low here means
# the model had no opinion -- which is what MIN_CONF is for.

# --- Debug output ------------------------------------------------------------

printf '%s' "${RESPONSE}" | jq -r '
  def show($name):
    .answers[$name] as $a
    | "\($name):  \($a.choice // "none")  confidence \($a.confidence // "?")"
      + "\n  " + ($a.probabilities // {} | to_entries
                  | map("\(.key)=\(.value)") | join("  "));
  show("tier"), show("scope")' >&2

# --- Read answers ------------------------------------------------------------

IFS=$'\t' read -r TIER SCOPE TIER_CONF < <(
  printf '%s' "${RESPONSE}" | jq -r '
    [ .answers.tier.choice      // "none",
      .answers.scope.choice     // "none",
      .answers.tier.confidence  // 0 ] | @tsv'
)

# --- Apply routing rules (only move up) --------------------------------------

FINAL="${TIER}"

case "${FINAL}" in
  local|general|reasoning) ;;
  *)
    log "bump:   unknown tier '${TIER}' -> general"
    FINAL="general"
    ;;
esac

if [ "${FINAL}" = "local" ] \
   && awk -v c="${TIER_CONF}" -v m="${MIN_CONF}" 'BEGIN { exit !(c < m) }'; then
  log "bump:   local with low confidence (${TIER_CONF} < ${MIN_CONF}) -> general"
  FINAL="general"
fi

case "${SCOPE}" in
  system)
    if [ "${FINAL}" != "reasoning" ]; then
      log "bump:   scope=system -> reasoning"
      FINAL="reasoning"
    fi
    ;;
  multi)
    if [ "${FINAL}" = "local" ]; then
      log "bump:   scope=multi -> general"
      FINAL="general"
    fi
    ;;
esac

log "final:  ${FINAL}"

# --- Output model id ---------------------------------------------------------

case "${FINAL}" in
  local)     echo "${LOCAL_MODEL}" ;;
  reasoning) echo "${REASONING_MODEL}" ;;
  *)         echo "${GENERAL_MODEL}" ;;
esac
