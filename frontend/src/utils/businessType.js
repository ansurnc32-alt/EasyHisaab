export const BUSINESS_TYPE_OPTIONS = [
  { value: 'grocery', label: 'किराना' },
  { value: 'rental', label: 'किराया' },
];

export function normalizeBusinessType(value = 'grocery') {
  if (value === 'rental' || value === 'किराया' || value === 'Rental') {
    return 'rental';
  }

  return 'grocery';
}

export function getBusinessTypeLabel(value = 'grocery') {
  return normalizeBusinessType(value) === 'rental'
    ? BUSINESS_TYPE_OPTIONS[1].label
    : BUSINESS_TYPE_OPTIONS[0].label;
}

export function getParserBusinessType(value = 'grocery') {
  return normalizeBusinessType(value) === 'rental' ? 'rental' : 'grocery';
}
