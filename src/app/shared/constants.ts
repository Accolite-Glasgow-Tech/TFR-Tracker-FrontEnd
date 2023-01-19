import { environment } from 'src/environments/environment';

export const tasksURL = `${environment.backendURL}/tasks`;
export const allProjectsURL = `${environment.backendURL}/search/project/all`;
export const TFRLocationCountURL = `${environment.backendURL}/tfrLocationCount`;
export const TFRStatusCountURL = `${environment.backendURL}/projects/statusCount`;
export const vendorsURL = `${environment.backendURL}/vendors`;
export const vendorsURLdupe = `${environment.backendURL}/search/vendors/all`;
export const projectSearchURL = `${environment.backendURL}/search/project`;
export const registrationURL = `${environment.backendURL}/register`;
export const loginURL = `${environment.backendURL}/login`;
export const resourceRolesURL = `${environment.backendURL}/resources/roles`;
export const resourceProjectsURL = `${environment.backendURL}/resources/projects`;
export const TFRCreationResourceURL = `${environment.backendURL}/resources/all/tfr-creation-resource`;
