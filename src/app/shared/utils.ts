import { environment } from 'src/environments/environment';

export function getAllocatedResourcesURL(projectId: Number): string {
  return `${environment.backendURL}/resources/projects/${projectId}/detailed`;
}

export function getMilestonesURL(projectId: number): string {
  return `${environment.backendURL}/projects/${projectId}/milestone`;
}

export function getPDFReportURL(projectId: number): string {
  return `${environment.backendURL}/reports/download/${projectId}`;
}

export function getSkillsURL(resourceId: number): string {
  return `${environment.backendURL}/search/resource/resource_skill/${resourceId}`;
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
