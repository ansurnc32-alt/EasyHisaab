import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveVoiceCommand } from './voiceCommands.js';

test('matches pdf preview navigation commands', () => {
  assert.deepEqual(resolveVoiceCommand('पीडीएफ बना दो'), {
    id: 'navigate-pdf-preview',
    action: { type: 'navigate', to: '/pdf' },
    label: 'Navigate to PDF preview',
  });

  assert.deepEqual(resolveVoiceCommand('बिल बना दो'), {
    id: 'navigate-pdf-preview',
    action: { type: 'navigate', to: '/pdf' },
    label: 'Navigate to PDF preview',
  });
});

test('matches pdf preview action commands', () => {
  assert.deepEqual(resolveVoiceCommand('डाउनलोड कर दो'), {
    id: 'pdf-download',
    action: { type: 'action', name: 'download' },
    label: 'Trigger download',
  });

  assert.deepEqual(resolveVoiceCommand('प्रिंट कर दो'), {
    id: 'pdf-print',
    action: { type: 'action', name: 'print' },
    label: 'Trigger print',
  });

  assert.deepEqual(resolveVoiceCommand('शेयर कर दो'), {
    id: 'pdf-share',
    action: { type: 'action', name: 'share' },
    label: 'Trigger share',
  });
});

test('matches global navigation commands', () => {
  assert.deepEqual(resolveVoiceCommand('नया बिल'), {
    id: 'new-bill',
    action: { type: 'navigate', to: '/business-selection' },
    label: 'Start a new bill',
  });

  assert.deepEqual(resolveVoiceCommand('होम'), {
    id: 'go-home',
    action: { type: 'navigate', to: '/' },
    label: 'Navigate home',
  });

  assert.deepEqual(resolveVoiceCommand('रिव्यू'), {
    id: 'go-review',
    action: { type: 'navigate', to: '/review' },
    label: 'Navigate to review',
  });

  assert.deepEqual(resolveVoiceCommand('वापस'), {
    id: 'go-back',
    action: { type: 'navigate', to: 'back' },
    label: 'Navigate back',
  });
});

test('ignores regular bill text', () => {
  assert.equal(resolveVoiceCommand('दो किलो आलू 50 रुपये'), null);
  assert.equal(resolveVoiceCommand('एक किलो दाल 70 रुपये'), null);
});
