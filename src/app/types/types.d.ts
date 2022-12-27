export interface ResourceListType {
    resource_name: string;
    resource_id: number;
    selected: boolean;
  }

export interface AllocatedResourceType{
  project_id: number,
  resource_id: number,
  resource_name: string,
  role: string
}