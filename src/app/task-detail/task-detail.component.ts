import { Component } from '@angular/core';
import { Project, ProjectTask } from '../models/project';
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
  projectId: string | null = null;
  projectTaskId: string | null = null;
  isLoading = false;
  errorMessage = '';

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

    this.loadProjectTask(projectId, taskId);
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
