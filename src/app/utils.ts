export interface ProjectDTO {
  id?: number;
  name: string;
  vendor_id: number;
  start_date: Date;
  end_date: Date;
  status: any;
  version: number;
  vendor_specific: string;
  is_deleted: boolean;
  created_by: number;
  created_at: Date;
  modified_by: number;
  modified_at: Date;
}

export interface TaskDTO {
  id?: number;
  project_id: number;
  task_type: any;
  execute_at: Date;
  recurring: boolean;
  cron: string | null;
  by_email: boolean;
  expiration_date: Date | null;
}

export interface ResourceDTO {
  id?: number;
  first_name: string;
  last_name: string;
  type: string;
  email: string;
  is_deleted: boolean;
}

export interface TaskCreationDTO {
  task: TaskDTO;
  resources: Array<ResourceDTO>;
}

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

export const daysOfWeek: Map<number, string> = new Map([
  [0, 'Sunday'],
  [1, 'Monday'],
  [2, 'Tuesday'],
  [3, 'Wednesday'],
  [4, 'Thursday'],
  [5, 'Friday'],
  [6, 'Saturday'],
]);
