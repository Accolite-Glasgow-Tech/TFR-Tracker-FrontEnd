
export interface Project {
  id: number;
  name: string;
  vendorId: number;
  startDate: Date;
  endDate: Date;
  status: string;
  version: string;
  vendorSpecific: string;
  milestones: Milestone[];
  isDeleted: Boolean;
}

export interface Milestone {
  id: number;
  projectId: number;
  description: string;
  startDate: Date;
  deliveryDate: Date;
  acceptanceDate: Date;
  isDeleted: Boolean;
  tracker: Tracker;
}

export interface Tracker {
  milestoneId: number;
  projectId: number;
  startDate: Date;
  endDate: Date;
  status: string;
}

export interface Vendor {
  id: number;
  name: string;
}

export interface ProjectResourceType{
  project_id: number,
  resource_id: number,
  role: string
}
