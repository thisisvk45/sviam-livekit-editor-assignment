# Make the coding conversation interactive

## Starting point

The user can edit TypeScript and talk to an agent. For each turn, the supplied
agent receives the transcript and a point-in-time copy of the editor. It can read
and discuss that code. It cannot highlight, execute, or modify it.

Implement the following three capabilities. You may change the structure of the
starter if you explain why. The sample coding problem is context for the demo;
solving two-sum itself is not the assignment.

## 1. Highlighting

Let the agent highlight relevant code while explaining it. The user must be able
to identify the referenced range and clear the highlight. Demonstrate what happens
if the code changes before a delayed highlight arrives. An outdated range must
not silently highlight unrelated code.

## 2. Code execution

Let the user request a run during the conversation. Show running, successful,
failed, and timed-out states with useful output. Let the agent discuss the actual
result. Bind results to the code revision that ran, and do not present an older
run as evidence about newer code. Explain the execution boundary and resource
limits. Do not execute arbitrary editor code inside the privileged web or agent
process. Supporting the supplied TypeScript/JavaScript exercise is enough; a
multi-language judge is not required.

## 3. Code proposals

When the user asks for help, let the agent propose a concrete code change. Show a
diff or equivalent before/after preview with accept and reject actions. Preserve
the user's control: changes apply only after acceptance. Handle edits made after
the proposal was created, repeated acceptance, and an interrupted or failed action.

## What we assess

- Whether the three features work together in a local conversation.
- Clear ownership of editor state and code revisions.
- Handling of stale, delayed, duplicate, failed, and concurrent operations.
- Appropriate execution isolation and understandable error/recovery behavior.
- Readable implementation and relevant verification evidence.
- Your ability to explain your PR, tradeoffs, and limitations in a technical review.

Be prepared to walk through a user editing code while the agent is responding,
two runs finishing out of order, an interrupted proposal, and a connection loss.
Explain which cases you handle, which you do not, and why.

## What we do not assess

- The inherent quality, intelligence, or factual accuracy of the supplied default model.
- Which AI coding assistant you use, or whether it generated most of the code.
- Provider speech quality, transcription accuracy, or provider/network latency outside your control.
- Purchasing credits, obtaining free-tier accounts, or choosing a more expensive model.
- Hosting, cloud deployment, authentication, or database integration.
- Visual polish beyond making the required interactions understandable and usable.

We do assess whether your implementation correctly handles the outputs and errors
it receives. Better model output does not compensate for incorrect application
state. Report provider problems separately from application failures.

## Required submission

An open, non-draft PR in **your assigned private repository**, including:

1. The implementation and relevant tests.
2. Local setup/demo instructions, including anything changed from the starter.
3. An architecture explanation covering data flow and state ownership.
4. Failure cases you tested and known limitations.
5. A brief description of AI assistance and how you checked its output.

No portal submission, hosting, or paid developer tooling is required. Submission
does not require merging the PR. The team reviews the code and discusses your
decisions with you; this is not an automatic model-output ranking exercise.
