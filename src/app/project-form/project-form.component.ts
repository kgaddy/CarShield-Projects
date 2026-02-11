import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, ProjectStatus } from '../models/project';
import { ProjectService } from '../services/project.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-project-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent implements OnInit {
  project: Project = {
    id: '',
    name: '',
    description: '',
    status: ProjectStatus.NotStarted,
    createdBy: '',
    createdOn: '',
    projectTasks: [],
    createdByDisplayName: '',
    percentComplete: 0
  };

  isEditMode = false;
  isLoading = false;
  errorMessage = '';
  isSaving = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('projectId');

    if (projectId) {
      this.isEditMode = true;
      this.loadProject(projectId);
    }
  }

  private loadProject(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.projectService.getProject(id).subscribe({
      next: (project) => {
        this.project = project;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load project. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {


    this.isSaving = true;
    this.errorMessage = '';

    if (this.isEditMode) {
      this.projectService.updateProject(this.project).subscribe({
        next: () => {
          this.isSaving = false;
        },
        error: () => {
          this.errorMessage = 'Unable to update project. Please try again later.';
          this.isSaving = false;
        }
      });
    } else {
      //current user's ID
      const currentUser = this.authService.currentUserValue;
      if (currentUser) {
        this.project.createdBy = currentUser.id;
      }

      this.projectService.createProject(this.project).subscribe({
        next: (createdProject) => {
          this.isSaving = false;
        },
        error: () => {
          this.errorMessage = 'Unable to create project. Please try again later.';
          this.isSaving = false;
        }
      });
    }
    this.goBack()
  }

  onCancel(): void {
    this.goBack()
  }

  goBack(): void {
    if (this.isEditMode && this.project.id) {
      this.router.navigate(['/projectDetail', this.project.id]);
    } else {
      this.router.navigate(['/projects']);
    }
  }
}
