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
  resources: ResourceDTO[];
}

export interface TrackerDTO {
  milestone_id: number;
  project_id: number;
  start_date: Date;
  end_date: Date;
  status: string;
  created_by: number;
  modified_by: number;
  created_at: Date;
  modified_at: Date;
}

export interface VendorDTO {
  id: number;
  name: string;
}

export interface VendorAttributeDTO {
  vendor_id: number;
  attribute_name: string;
  is_deleted: boolean;
}

export interface AllocatedResourceTypeDTO {
  project_id: number;
  resource_id: number;
  resource_name: string;
  resource_email: string;
  role: string;
}

export interface ProjectResourceDTO {
  project_id: number;
  resource_id: number;
  role: string;
}

export interface ProjectBasicDetails {
  name: string;
  start_date: Date;
  end_date: Date;
  vendor_id: number;
  vendor_specific: { [key: string]: string };
  status: string;
}

export interface ResourceListType {
  resource_name: string;
  resource_email: string;
  resource_id: number;
  selected: boolean;
}
