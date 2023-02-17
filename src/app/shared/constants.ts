import { environment } from 'src/environments/environment';

const backendURL = environment.backendURL;

export const tasksURL = `${backendURL}/tasks`;
export const taskAvailabilityURL = `${backendURL}/tasks/availability`;
export const allProjectsURL = `${backendURL}/search/project/all`;
export const TFRLocationCountURL = `${backendURL}/tfrLocationCount`;
export const TFRStatusCountURL = `${backendURL}/projects/statusCount`;
export const clientsURL = `${backendURL}/vendors`;
export const clientsURLdupe = `${backendURL}/search/clients/all`;
export const projectSearchURL = `${backendURL}/search/project`;
export const registrationURL = `${backendURL}/users/register`;
export const loginURL = `${backendURL}/users/login`;
export const resourceProjectsURL = `${backendURL}/resources/projects`;
export const TFRCreationResourceURL = `${backendURL}/resources/all/tfr-creation-resource`;
export const projectsURL = `${backendURL}/projects`;
export const approachingProjectsURL = `${backendURL}/ProjectsStartingInAWeek`;
export const clientProjectCountURL = `${backendURL}/VendorProjectCount`;
export const seniorityLevelsURL = `${backendURL}/resources/seniorityLevels`;

export const dateFormat = 'MM/dd/YY';
export const statusList = [
  'DRAFT',
  'AGREED',
  'IN PROGRESS',
  'ARCHIVED',
  'DELIVERED',
];

export const daysOfWeek: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
