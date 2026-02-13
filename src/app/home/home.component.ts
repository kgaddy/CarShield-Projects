import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { AuthService } from '../services/auth.service';
import { Project, ProjectStatus } from '../models/project';
import { User } from '../models/auth';
import { ProjectsListComponent } from '../componets/projects-list/projects-list.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ProjectsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  projects$!: Observable<Project[]>;
  currentUser$!: Observable<User | null>;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    //projects$ = this.projectService.getProjects();
    this.projects$ = this.projectService.getProjects();
    this.currentUser$ = this.authService.currentUser$;
  }

}
