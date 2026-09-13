# Starter verification

Checked locally on macOS with Node.js 20.19.6, LiveKit Server 1.13.6, and the
dependency versions in the lockfile. CI uses Node.js 22 on Linux.

- TypeScript checks, three protocol boundary tests, and the production Next.js
  build passed.
- A headless Chromium session connected to the real local LiveKit server and
  Node.js worker using `npm run agent` in mock mode.
- Two successive text turns captured two different editor revisions and the
  expected code. Disconnecting and reconnecting retained the editor in the open
  browser and captured its current content in the new room. No browser page
  errors were observed in that check.
- The UI was visually inspected, including the transcript and captured context.

These checks verify the supplied transport and editor baseline. They do not
verify real speech, provider credentials, model responses, audio interruptions,
or the three candidate features. Funded Deepgram, OpenAI, and ElevenLabs access
must be configured and a complete spoken conversation tested before issuing this
assignment to candidates. The three features intentionally remain unimplemented.

Local development is the supported deployment. Windows/Linux browser and native
audio behavior have not been manually tested. This record is about the starter,
not evidence for a candidate's later changes.
