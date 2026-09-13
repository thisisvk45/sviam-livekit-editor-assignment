# Make the coding assistant interactive

We give you a TypeScript editor and an agent that can read the code and discuss it.
Your task is to add **highlighting, code execution, and suggested edits**.
Build and demo it on your laptop. No deployment, login, database, or LiveKit Cloud account is required.

## How it works

The browser holds the code. When the user finishes speaking, the agent asks for a
fresh copy before replying. Typed questions work the same way. LiveKit carries
the audio and messages between them.

![Architecture: the browser, LiveKit server, and Node.js agent run locally. The agent uses Deepgram, OpenAI, and ElevenLabs online for voice.](docs/images/architecture.svg)

## What you need to build

| Feature | Expected behavior |
| --- | --- |
| **Highlight** | The agent points to relevant lines while explaining them. The user can clear the highlight. |
| **Run** | The user asks to run code. Show running, success, errors, timeouts, and output; let the agent discuss the actual result. |
| **Suggest edits** | The agent shows a proposed change as a diff or before/after preview. Apply it only when the user accepts; allow rejection. |

Keep each action tied to the code it refers to. Handle code changing mid-response,
late or duplicate messages, overlapping runs, repeated acceptance, and interrupted
or failed actions. An old result must not appear to describe new code.
Run editor code in an isolated environment with time and resource limits, outside the web or agent process.
Supporting TypeScript/JavaScript is enough; solving the sample two-sum problem is not the assignment.
You may restructure the starter—explain your choices.

## Your steps

![Candidate steps: accept your private invitation, run the starter locally, build the three features, check them locally, and open a pull request.](docs/images/candidate-flow.svg)

**Start locally.** Accept your assigned repository invitation, clone it, and
open its folder. Use Node.js 22 and install [LiveKit Server](https://docs.livekit.io/transport/self-hosting/local/)
(`brew install livekit` on macOS). Then run:

```sh
npm ci
npm run setup
```

Keep these running in three separate terminals:

| Terminal | Command |
| --- | --- |
| LiveKit server | `livekit-server --dev` |
| Web app | `npm run dev` |
| Agent | `npm run agent` |

Open **http://127.0.0.1:3000**, click **Connect agent**, and wait for **Connected**.
Edit the code and send a typed question. The default **mock mode** reports the
captured code version without API keys; it checks the connection, not real AI or voice.

**Add the team's API access.** The hiring team will share funded OpenAI,
Deepgram, and ElevenLabs keys, plus an ElevenLabs voice ID, privately.
If you have not received access instructions, contact the person who sent your assignment.
You do not need to buy credits or use free-tier accounts. GitHub does not issue these keys.

`npm run setup` creates `.env.local`. Replace the following settings with the
values from the team; keep the other settings as supplied:

```dotenv
AGENT_MODE=voice
OPENAI_API_KEY=replace-with-team-key
DEEPGRAM_API_KEY=replace-with-team-key
ELEVEN_API_KEY=replace-with-team-key
ELEVEN_VOICE_ID=replace-with-team-voice-id
```

Keep this file on your laptop; never put keys in a commit or PR. Restart the web
app and agent, reconnect, and click **Enable microphone**. Voice mode uses the
online providers for speech, transcript, and code context. If access fails, tell
the team; you can still check the local connection in mock mode.

**Build, check, and submit.** Demo the three features locally with voice, then run:

```sh
npm run check
npm run build
```

Push a `solution` branch and open a PR to `main` in **your assigned private repo**.
Keep `main` unchanged and mark the PR ready for review. Include local demo steps,
your architecture, tests, failure cases, limitations, and how you checked any AI-generated code.
No portal upload or merge is needed. Other candidates have no access; the owner
and authorized reviewers can see your work. Use the deadline in your invitation.

## How we review it

We assess the features, state handling, execution isolation, and your ability to
explain the architecture. AI coding tools are fully allowed. We do not score the
default model's intelligence or factual accuracy, your choice of coding assistant,
provider speech/transcription quality or latency outside your control, or visual
polish beyond usability. We do assess how your app handles provider outputs and errors.

Optional: [code map and starter limitations](docs/implementation-notes.md).
