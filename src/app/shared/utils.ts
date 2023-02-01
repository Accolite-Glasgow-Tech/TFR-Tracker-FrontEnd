import { environment } from 'src/environments/environment';
import { projectsURL } from './constants';
import { Console } from 'console';

export function getUserTasksURL(userId: number): string {
  return `${environment.backendURL}/tasks/${userId}`;
}

export function getResourcesByProjectIdURL(projectId: number): string {
  return `${environment.backendURL}/search/resource/project/${projectId}`;
}

export function getAllocatedResourcesURL(projectId: Number): string {
  return `${environment.backendURL}/resources/projects/${projectId}/detailed`;
}

export function getUpdateProjectStatusURL(
  projectId: Number,
  status: string
): string {
  return `${projectsURL}/${projectId}/status/${status}`;
}

export function getProjectURL(projectId: Number): string {
  return `${projectsURL}/${projectId}`;
}

export function getMilestonesURL(projectId: number): string {
  return `${environment.backendURL}/projects/${projectId}/milestone`;
}

export function getVendorAttributesURL(vendorId: number): string {
  return `${environment.backendURL}/vendorAttributes/${vendorId}`;
}

export function getPDFReportURL(projectId: number): string {
  return `${environment.backendURL}/reports/download/${projectId}`;
}

export function range(start: number, end?: number) {
  if (typeof start === 'number') {
    if (end === undefined) {
      return [...Array(start).keys()];
    }
    if (typeof end === 'number') {
      return Array.from({ length: end - start }, (v, k) => k + start);
    }
  }
  throw new Error('Unssported input(s)');
}

export function log(...data: any): void {
  if (!environment.production) {
    console.log(data);
  }
}
