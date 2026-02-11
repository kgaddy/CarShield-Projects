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
}

