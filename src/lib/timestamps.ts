const RELATIVE_TIME_FORMATTER = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

const ABSOLUTE_TIME_FORMATTER = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
  timeStyle: 'short'
});

const RELATIVE_TIME_THRESHOLDS: {
  unit: Intl.RelativeTimeFormatUnit;
  unitInMs: number;
  thresholdInUnits: number;
}[] = [
  { unit: 'year', unitInMs: 365 * 24 * 60 * 60 * 1000, thresholdInUnits: 2 },
  { unit: 'month', unitInMs: 30 * 24 * 60 * 60 * 1000, thresholdInUnits: 2 },
  { unit: 'week', unitInMs: 7 * 24 * 60 * 60 * 1000, thresholdInUnits: 2 },
  { unit: 'day', unitInMs: 24 * 60 * 60 * 1000, thresholdInUnits: 2 },
  { unit: 'hour', unitInMs: 60 * 60 * 1000, thresholdInUnits: 1 },
  { unit: 'minute', unitInMs: 60 * 1000, thresholdInUnits: 1 },
  { unit: 'second', unitInMs: 1000, thresholdInUnits: 0 }
];

function getRelativeTimeString(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  if (diffMs < 0) {
    return 'from future';
  }

  for (const { unit, unitInMs, thresholdInUnits } of RELATIVE_TIME_THRESHOLDS) {
    const valueInUnits = Math.floor(diffMs / unitInMs);
    if (valueInUnits >= thresholdInUnits) {
      return RELATIVE_TIME_FORMATTER.format(-valueInUnits, unit);
    }
  }

  throw new Error(`No matching threshold for ${diffMs}ms diff`);
}

export function formatTimestamp(date: Date): string {
  const relative = getRelativeTimeString(date);
  const absolute = ABSOLUTE_TIME_FORMATTER.format(date);

  return `${relative} (${absolute})`;
}
