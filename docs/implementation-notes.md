# Optional implementation notes

The [README](../README.md) contains the complete candidate brief. These notes are
only for finding code and understanding the supplied baseline.

| File | What it does |
| --- | --- |
| `src/components/Editor.tsx` | Displays the editor. |
| `src/components/Workspace.tsx` | Connects to LiveKit; shows messages and the captured code. |
| `src/lib/protocol.ts` | Defines and checks messages and editor snapshots. |
| `src/server/router.ts` | Creates a local room and a token to join it, through tRPC. |
| `agent/main.ts` | Runs the agent, voice providers, and requests to read the editor. |
| `agent/provider-access.ts` | Routes a personal portal key through SViam's metered provider gateway. |

## A turn through the code

The browser owns the editor. Each edit increases its `revision`; `documentId`
identifies that editor document. At the end of a spoken turn,
`onUserTurnCompleted` requests `assignment.editorSnapshot` through LiveKit RPC.
The browser returns the code, revision, and capture time. This captures the code
when the request arrives, not when speech began. Typed turns use the same request.
The agent checks that snapshot, displays it in the browser, and uses it with the
user's words. If capture fails, it reports failure instead of assuming old code is current.

Audio travels over WebRTC; snapshots and text travel over LiveKit RPC/text streams.
tRPC only sets up the session. Silero detects speech locally; Deepgram transcribes,
OpenAI generates the reply, and ElevenLabs produces speech.

## Limits to know

- Each connection gets a room for one user and one agent. Input waits for agent readiness.
- Snapshots are capped at 12 KB including JSON overhead. Requests accept only the assigned participants.
- Editor state and transcript are not saved after a page reload. The agent forgets which text turns it has already handled if it restarts.
- The browser shows at most 100 events. Provider conversation history grows during a session.
- The local worker allows four rooms to accommodate reconnect cleanup. This is a local starter, not a production deployment.
- Highlighting, running code, and edit proposals are deliberately left for you to implement.

## Verification and troubleshooting

`npm run doctor` checks local configuration and the LiveKit port. It does not
validate API credentials. Candidate repository Actions are disabled; run checks
locally. The master template has CI for TypeScript checks, protocol tests, and builds.

The starter passed those checks and a Chromium test against local LiveKit: two
fresh editor revisions, disconnect, and reconnect, in mock mode. The UI was also
visually inspected. That test used macOS, Node.js 20.19.6, and LiveKit 1.13.6;
CI uses Node.js 22 on Linux. Native audio on other operating systems was not manually tested.

The portal provisions personal access and enforces credits and expiry on its
server. This repository consumes that access through the local agent. Mock tests
do not verify real speech, provider credentials, or voice interruptions.
