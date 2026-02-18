import { Component } from '@angular/core';
import { Project, ProjectTask, TaskStatus } from '../models/project';
import { ProjectService } from '../services/project.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})

export class TaskDetailComponent {
  projectTask: ProjectTask | null = null;
  project: Project | null = null;
  projectId: string | null = null;
  projectTaskId: string | null = null;
  isLoading = false;
  errorMessage = '';
  TaskStatus = TaskStatus;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('projectId');
    const taskId = this.route.snapshot.paramMap.get('taskId');
    if (!projectId || !taskId) {
      this.errorMessage = 'Missing id.';
      return;
    }
    this.projectId = projectId;
    this.projectTaskId = taskId;
    this.loadProject(projectId);
    this.loadProjectTask(projectId, taskId);
  }


  canEditProjectTask(projectTask: ProjectTask | null): boolean {
    if (!projectTask || !this.project) {
      return false;
    }
    return this.projectService.canEditTask(projectTask, this.project);
  }

  private loadProject(projectId: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.projectService.getProject(projectId).subscribe({
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

  private loadProjectTask(projectId: string, taskId: string): void {
    this.isLoading = true;
    this.errorMessage = '';


    this.projectService.getProjectTask(projectId, taskId).subscribe({
      next: (projectTask) => {
        this.projectTask = projectTask;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load task details. Please try again later.';
        this.isLoading = false;
      }
    });
  }

}
