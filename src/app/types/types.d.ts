import { TrackerDTO, ProjectResourceDTO } from '../shared/interfaces';

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
  project_resources: ProjectResourceDTO[];
}

export interface Milestone {
  id: number;
  project_id: number;
  description: string;
  start_date: Date;
  delivery_date: Date;
  acceptance_date: Date;
  is_deleted: Boolean;
  tracker: TrackerDTO;
}
