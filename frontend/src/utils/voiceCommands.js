const COMMANDS = [
  {
    id: 'navigate-pdf-preview',
    label: 'Navigate to PDF preview',
    matchers: ['पीडीएफ बना दो', 'बिल बना दो', 'generate pdf'],
    action: { type: 'navigate', to: '/pdf' },
  },
  {
    id: 'pdf-download',
    label: 'Trigger download',
    matchers: ['डाउनलोड कर दो'],
    action: { type: 'action', name: 'download' },
  },
  {
    id: 'pdf-print',
    label: 'Trigger print',
    matchers: ['प्रिंट कर दो'],
    action: { type: 'action', name: 'print' },
  },
  {
    id: 'pdf-share',
    label: 'Trigger share',
    matchers: ['शेयर कर दो'],
    action: { type: 'action', name: 'share' },
  },
  {
    id: 'new-bill',
    label: 'Start a new bill',
    matchers: ['नया बिल'],
    action: { type: 'navigate', to: '/business-selection' },
  },
  {
    id: 'go-home',
    label: 'Navigate home',
    matchers: ['होम'],
    action: { type: 'navigate', to: '/' },
  },
  {
    id: 'go-review',
    label: 'Navigate to review',
    matchers: ['रिव्यू'],
    action: { type: 'navigate', to: '/review' },
  },
  {
    id: 'go-back',
    label: 'Navigate back',
    matchers: ['वापस'],
    action: { type: 'navigate', to: 'back' },
  },
];

const normalizeVoiceCommand = (value = '') => {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:'"()\-_/\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export const resolveVoiceCommand = (value = '') => {
  const normalized = normalizeVoiceCommand(value);

  if (!normalized) {
    return null;
  }

  const resolvedCommand = COMMANDS.find((command) => {
    return command.matchers.some((matcher) => normalizeVoiceCommand(matcher) === normalized);
  });

  if (!resolvedCommand) {
    return null;
  }

  return {
    id: resolvedCommand.id,
    action: resolvedCommand.action,
    label: resolvedCommand.label,
  };
};

export const getVoiceCommandHint = (value = '') => {
  const resolved = resolveVoiceCommand(value);
  return resolved ? resolved.label : null;
};
