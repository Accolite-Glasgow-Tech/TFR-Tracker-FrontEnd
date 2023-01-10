export enum Frequency {
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly',
}

export enum DayOfMonth {
  first = 'First',
  last = 'Last',
  specificLast = 'SpecificLast',
  custom = 'Custom',
}

export const daysOfWeek: Map<number, string> = new Map([
  [0, 'Sunday'],
  [1, 'Monday'],
  [2, 'Tuesday'],
  [3, 'Wednesday'],
  [4, 'Thursday'],
  [5, 'Friday'],
  [6, 'Saturday'],
]);
