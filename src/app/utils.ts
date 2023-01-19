import { environment } from 'src/environments/environment';

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

export enum RecieverOptions {
  self = 'Only me',
  allProjectResources = 'All project contacts',
  custom = 'Custom',
}

export const daysOfWeek: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
