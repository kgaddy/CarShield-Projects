export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  status: number;
  assignedTo: string;
}

export interface Project {
  id: string;
  description: string;
  status: number;
  createdBy: string;
  createdOn: string;
  projectTasks: ProjectTask[];
}
