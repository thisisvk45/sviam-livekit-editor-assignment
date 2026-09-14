import assert from 'node:assert/strict';
import test from 'node:test';
import { providerAccess } from '../agent/provider-access';

test('one portal key configures all three SDK transports', () => {
  const access = providerAccess({SVIAM_ASSIGNMENT_KEY:'test-key',SVIAM_GATEWAY_URL:'https://gateway.example/hiring/starter/gateway/'});
  assert.equal(access.openai.baseURL,'https://gateway.example/hiring/starter/gateway/openai/v1');
  assert.equal(access.deepgram.baseUrl,'wss://gateway.example/hiring/starter/gateway/deepgram');
  assert.equal(access.elevenlabs.baseURL,'https://gateway.example/hiring/starter/gateway/elevenlabs/v1');
  assert.equal(access.openai.apiKey,access.deepgram.apiKey);
});
test('rejects insecure remote gateway URLs and URL credentials', () => {
  for (const url of ['http://example.com','https://user:secret@example.com','https://example.com?key=secret']) {
    assert.throws(() => providerAccess({SVIAM_ASSIGNMENT_KEY:'test',SVIAM_GATEWAY_URL:url}));
  }
});
