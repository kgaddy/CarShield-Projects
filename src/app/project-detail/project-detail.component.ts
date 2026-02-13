import { Component } from '@angular/core';
import { Project, ProjectStatus, TaskStatus } from '../models/project';
import { ProjectService } from '../services/project.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})

export class ProjectDetailComponent {
  project: Project | null = null;
  TaskStatus = TaskStatus
  ProjectStatus = ProjectStatus;
  Id: string | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    // Subscribe to route params to reload data when navigating back to the same route
    this.route.paramMap.subscribe(params => {
      const Id = params.get('Id');

      if (!Id) {
        this.errorMessage = 'Missing id.';
        return;
      }

      this.loadProject(Id);
    });
  }

  private loadProject(Id: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.projectService.getProject(Id).subscribe({
      next: (project) => {
        this.project = project;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load project details. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  canEdit(): boolean {
    if (!this.project) {
      return false;
    }
    return this.projectService.canEditProjectSync(this.project);
  }

  onEditTask(taskId: string) {
    if (!this.project?.id) {
      return;
    }
    this.router.navigate(['/editTask', this.project.id, taskId]);
  }

  onDeleteTask(taskId: string) {
    if (!this.project?.id) {
      return;
    }

    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    this.projectService.deleteTask(this.project.id, taskId).subscribe({
      next: () => {
        // Reload the project to refresh the task list
        this.loadProject(this.project!.id);
      },
      error: () => {
        this.errorMessage = 'Unable to delete task. Please try again later.';
      }
    });
  }

}



