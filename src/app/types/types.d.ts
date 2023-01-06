export interface Project {
  id: number;
  name: string;
  vendor_id: number;
  start_date: Date;
  end_date: Date;
  status: string;
  version: number;
  vendor_specific: string;
  is_deleted: Boolean;
  created_by: number;
  modified_by: number;
  created_at: Date;
  modified_at: Date;
  milestones: Milestone[];
  project_resources: ProjectResource[];
}
export interface Milestone {
  id: number;
  project_id: number;
  description: string;
  start_date: Date;
  delivery_date: Date;
  acceptance_date: Date;
  is_deleted: Boolean;
  tracker: Tracker;
}
export interface Tracker {
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

export interface Vendor {
  id: number;
  name: string;
}

export interface ProjectBasicDetails {
  name: string;
  start_date: Date;
  end_date: Date;
  vendor_id: number;
  vendor_specific: string;
  status: string;
}

export interface VendorAttribute {
  vendor_id: number;
  attributeName: string;
}

export interface ResourceListType {
  resource_name: string;
  resource_email: string;
  resource_id: number;
  selected: boolean;
}
export interface AllocatedResourceType {
  project_id: number;
  resource_id: number;
  resource_name: string;
  resource_email: string;
  role: string;
}
export interface ProjectResource {
  project_id: number;
  resource_id: number;
  role: string;
}
