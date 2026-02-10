import { Component } from '@angular/core';
import { Project, ProjectStatus } from '../models/project';
import { ProjectService } from '../services/project.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})

export class ProjectDetailComponent {
  project: Project | null = null;
  ProjectStatus = ProjectStatus;
  Id: string | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    const Id = this.route.snapshot.paramMap.get('Id');

    if (!Id) {
      this.errorMessage = 'Missing id.';
      return;
    }

    this.loadProject(Id);
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



}



