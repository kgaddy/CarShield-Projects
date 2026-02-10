import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectTask } from '../models/project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-task-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.scss'
})
export class TaskAddComponent {

  isLoading = false;
  errorMessage = '';
  successMessage = '';
  projectTask: ProjectTask | null = null;


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

    this.projectService.addTask(projectId, payload?.title!, payload.description!, payload.status!, payload.assignedTo!).subscribe({
      next: (projectTask) => {
        this.projectTask = projectTask;
        this.isLoading = false;
        this.successMessage = 'Seed updated.';
        // this.goBack();
      },
      error: () => {
        this.errorMessage = 'Unable to update seed. Please try again later.';
        this.isLoading = false;
      }
    });
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
