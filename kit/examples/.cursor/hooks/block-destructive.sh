#!/usr/bin/env bash
# Fictional example – not Markant code.
# Cursor passes the pending command as JSON on stdin. Deny destructive ones.
# HOOK-TEST is a harmless marker to test the hook: ask the agent to run `echo HOOK-TEST`.
# Check the event name and the JSON fields against the hooks docs of your Cursor version.
input="$(cat)"
if printf '%s' "$input" | grep -Eq 'HOOK-TEST|rm -rf|git push .*--force|terraform (apply|destroy)|kubectl delete'; then
  printf '%s\n' '{"permission":"deny","user_message":"Blocked by team hook: destructive command. Ask a human.","agent_message":"This command is blocked by policy. Propose a safe alternative or stop."}'
else
  printf '%s\n' '{"permission":"allow"}'
fi
