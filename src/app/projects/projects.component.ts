import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { AuthService } from '../services/auth.service';
import { Project, ProjectStatus } from '../models/project';
import { User } from '../models/auth';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  ProjectStatus = ProjectStatus;
  projects$!: Observable<Project[]>;
  currentUser$!: Observable<User | null>;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.projects$ = this.projectService.getProjects();
    this.currentUser$ = this.authService.currentUser$;
  }

  canEdit(project: Project): boolean {

    return this.projectService.canEditProjectSync(project);
  }

  onDeleteProject(projectId: string) {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }
    
    this.projectService.deleteProject(projectId).subscribe({
      next: () => {
        // Refresh the projects list after successful deletion
        this.projects$ = this.projectService.getProjects();
      },
      error: (error) => {
        console.error('Error deleting project:', error);
        const errorMessage = error.error?.message || error.message || 'Unknown error';
        alert(`Failed to delete project: ${errorMessage}\n\nCheck console for details.`);
      }
    });
  }
}

