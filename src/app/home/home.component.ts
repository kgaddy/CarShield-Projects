import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { AuthService } from '../services/auth.service';
import { Project, ProjectTask } from '../models/project';
import { User } from '../models/auth';
import { ProjectsListComponent } from '../componets/projects-list/projects-list.component';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { TaskListComponent } from '../componets/task-list/task-list.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ProjectsListComponent, TaskListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  projects$!: Observable<Project[]>;
  projectTasks$!: Observable<ProjectTask[]>;
  currentUser$!: Observable<User | null>;
  currentUserValue: User | null = null;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.projects$ = this.projectService.getProjects();
    this.currentUser$ = this.authService.currentUser$;

    this.currentUserValue = this.authService.currentUserValue;
    if (this.currentUserValue?.id) {
      this.projectTasks$ = this.projectService.getUserProjectTask(this.currentUserValue.id);
    }
  }

}
