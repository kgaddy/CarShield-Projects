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
  status: ProjectStatus;
  createdBy: string;
  createdOn: string;
  projectTasks: ProjectTask[];
}

export enum ProjectStatus {
  NotStarted = 0,
  InProgress = 1,
  Completed = 2
}

export namespace ProjectStatus {
  export function toDisplayString(status: ProjectStatus): string {
    switch (status) {
      case ProjectStatus.NotStarted:
        return 'Not Started';
      case ProjectStatus.InProgress:
        return 'In Progress';
      case ProjectStatus.Completed:
        return 'Completed';
      default:
        return 'Unknown';
    }
  }

  export function getStatusStyle(status: ProjectStatus): string {
  switch (status) {
    case ProjectStatus.NotStarted:
      return 'text-bg-info';
    case ProjectStatus.InProgress:
      return 'text-bg-success';
    case ProjectStatus.Completed:
      return 'text-bg-secondary';
    default:
      return 'text-bg-danger';
    }
}
}
