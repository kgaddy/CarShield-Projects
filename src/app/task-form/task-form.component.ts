import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectTask } from '../models/project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {

  isLoading = false;
  errorMessage = '';
  successMessage = '';
  projectTask: ProjectTask | null = null;
  isEditMode = false;
  taskId: string | null = null;

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {
    this.form = this.formBuilder.group({
      title: [''],
      description: [''],
      assignedTo: [''],
      status: 0,
    });
  }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('taskId');
    this.isEditMode = !!this.taskId;

    if (this.isEditMode && this.taskId) {
      this.loadTask();
    }
  }

  private loadTask(): void {
    const projectId = this.route.snapshot.paramMap.get('projectId');

    if (!projectId || !this.taskId) {
      this.errorMessage = 'Missing project or task id.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.projectService.getProjectTask(projectId, this.taskId).subscribe({
      next: (task) => {
        this.projectTask = task;
        this.form.patchValue({
          title: task.title,
          description: task.description,
          assignedTo: task.assignedTo,
          status: task.status
        });
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load task. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    const projectId = this.route.snapshot.paramMap.get('projectId');

    if (!projectId) {
      this.errorMessage = 'Missing project id.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload = this.buildPayload();

    if (this.isEditMode && this.taskId) {
      // Update existing task
      this.projectService.updateTask(projectId, this.taskId, payload?.title!, payload.description!, payload.status!, payload.assignedTo!).subscribe({
        next: (projectTask) => {
          this.projectTask = projectTask;
          this.isLoading = false;
          this.successMessage = 'Task updated successfully.';
          this.goBack();
        },
        error: () => {
          this.errorMessage = 'Unable to update task. Please try again later.';
          this.isLoading = false;
        }
      });
    } else {
      // Add new task
      this.projectService.addTask(projectId, payload?.title!, payload.description!, payload.status!, payload.assignedTo!).subscribe({
        next: (projectTask) => {
          this.projectTask = projectTask;
          this.isLoading = false;
          this.successMessage = 'Task created successfully.';
          this.goBack();
        },
        error: () => {
          this.errorMessage = 'Unable to create task. Please try again later.';
          this.isLoading = false;
        }
      });
    }
  }

  goBack(): void {
    const projectId = this.route.snapshot.paramMap.get('projectId');
    if (projectId) {
      this.router.navigate(['/projectDetail', projectId]);
    } else {
      this.router.navigate(['/projects']);
    }
  }

  private buildPayload(): Partial<ProjectTask> {
    const raw = this.form.getRawValue();
    const payload: Partial<ProjectTask> = {
      title: this.toOptionalString(raw.title),
      description: this.toOptionalString(raw.description),
      assignedTo: this.toOptionalString(raw.assignedTo),
      status: this.toOptionalNumber(raw.status),
    };
    return payload;
  }

  private toOptionalString(value: string | null | undefined): string | undefined {
    if (value === null || value === undefined) {
      return undefined;
    }

    const trimmed = value.trim();
    return trimmed === '' ? undefined : trimmed;
  }

  private toOptionalNumber(value: string | number | null): number | undefined {
    if (value === null || value === undefined || value === '') {
      return undefined;
    }

    const parsed = typeof value === 'number' ? value : Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  }

}
