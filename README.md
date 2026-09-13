# SViam · Interactive coding agent

Turn a voice agent that can **read** an editor into one that can **highlight code,
run code, and propose edits**. Work locally and submit a pull request in the private
repository you were invited to. AI coding tools are fully allowed.

Read [ASSIGNMENT.md](ASSIGNMENT.md) for the requirements, evaluation exclusions,
and submission instructions. The supplied starter does not implement the three
assignment features.

## What is supplied

- Next.js App Router, React, TypeScript, tRPC, and a CodeMirror editor.
- A local LiveKit server connection and a Node.js agent worker.
- Real voice mode using Deepgram STT, OpenAI LLM, ElevenLabs TTS, and local Silero VAD.
- A read-only editor RPC. At each completed spoken turn, the agent requests a fresh
  editor snapshot before generating its response. Typed turns also capture context.
- A visible copy of the snapshot, including document ID, revision, and capture time.
- A clearly labeled **mock mode** for checking the LiveKit/text/editor connection
  without paid credentials. It does not simulate voice or measure model quality.
- No application login, database, cloud LiveKit project, or deployment requirement.

## Local setup

Use Node.js 22 LTS (minimum 20.19), npm, and a modern desktop browser.

```sh
npm ci
npm run setup
```

Install [LiveKit Server](https://docs.livekit.io/transport/self-hosting/local/).
On macOS: `brew install livekit`. On Linux/Windows, use the official installation
instructions. Start it in its own terminal:

```sh
livekit-server --dev
```

This uses LiveKit's documented local development credentials `devkey` / `secret`.
Keep the server and app on localhost. These are not production credentials.

In two more terminals, from this repository:

```sh
npm run dev
```

```sh
npm run agent
```

Open **http://127.0.0.1:3000**. Click **Connect agent**, wait for **Connected**, edit
the sample code, and send a typed question. In default mock mode, the response
reports the captured revision and first code line. Expand **Editor context used
by the agent** to inspect exactly what was captured. Edit again and send another
turn to verify that a fresh revision is captured.

### Real voice

The hiring team supplies funded provider access separately. Do not buy credits or
create free-tier accounts for this assignment. If access is not supplied, contact
the team; mock checks are not a substitute for the final voice check.

In your untracked `.env.local`, set `AGENT_MODE=voice`, the three provider keys,
and `ELEVEN_VOICE_ID` from the team's setup. Never commit credentials. Restart
both web and agent processes after changing this file. Connect, click **Enable
microphone**, speak, and wait for the response. Headphones are recommended.

The app and LiveKit run locally. Speech, transcript, and editor context are sent
to the configured providers in voice mode. A provider outage is not a candidate
failure; report the failure and preserve reproducible local evidence.

## Checks

```sh
npm run doctor
npm run check
npm run build
```

`doctor` checks configuration presence and the local server port; it does not
validate credentials or certify a voice conversation. The tests check snapshot
boundaries. The master starter's GitHub CI runs typechecking, those tests, and the
Next.js build without secrets. Actions are disabled in candidate repositories;
run your checks locally. Include relevant tests for the features you add.
See [VALIDATION.md](VALIDATION.md) for completed checks and outstanding voice testing.

## Where to work

| Path | Responsibility |
| --- | --- |
| `src/components/Editor.tsx` | Editor integration |
| `src/components/Workspace.tsx` | LiveKit connection, text turns, transcript, snapshot UI |
| `src/lib/protocol.ts` | Shared payload validation and context format |
| `src/server/router.ts` | tRPC local room creation and scoped join token |
| `agent/main.ts` | Node.js agent, voice pipeline, read-only context capture |

See [ARCHITECTURE.md](ARCHITECTURE.md) for the two data paths, capture semantics,
extension points, and baseline limitations.

## Submit on GitHub

Accept your private repository invitation. Create a branch such as `solution`,
push your implementation, and open a PR targeting `main` **in that repository**.
Use the PR template, then mark it ready for review. A draft is work in progress;
an open, non-draft PR is your submission. No portal upload is required. You do not
need to merge the PR. Keep `main` at the supplied starter so the diff is reviewable.

Each candidate is assigned an independent private repository. Other candidates
are not granted access. You, the repository owner, and authorized reviewers can
see your code, PRs, and review comments. GitHub does not provide author-only
visibility between PRs in a shared repository. Do not open your submission against
the starter template or publish your assigned repository elsewhere.

The deadline and any extensions are supplied in your invitation. While waiting
for review, keep changes on the submission branch; reviewers identify revisions
by commit SHA rather than assuming an old review covers later pushes.
