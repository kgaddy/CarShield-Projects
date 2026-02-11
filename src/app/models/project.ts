export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo: string;
  assignedToDisplayName: String;
}

export enum TaskStatus {
  StatusNew = 0, // new is a reserved word
  Ready = 1,
  InProgress = 2,
  Done = 3
}

export namespace TaskStatus {

  export function toDisplayString(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.StatusNew:
        return 'New';
      case TaskStatus.Ready:
        return 'Ready';
      case TaskStatus.InProgress:
        return 'In Progress';
      case TaskStatus.Done:
        return 'Done';
      default:
        return 'Unknown';
    }
  }
}


export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  createdBy: string;
  createdOn: string;
  projectTasks: ProjectTask[];
  createdByDisplayName: string;
  percentComplete: DoubleRange
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
