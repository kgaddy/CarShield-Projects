import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Project, ProjectTask } from '../models/project';
import { AuthService } from './auth.service';
import { User } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // all
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/api/Project/GetProjects');
  }


  // Get all projects for user

  getProjectsWithPermissions(): Observable<{ projects: Project[], currentUser: User | null }> {
    return combineLatest([
      this.http.get<Project[]>('/api/Project/GetProjects'),
      this.authService.currentUser$
    ]).pipe(
      map(([projects, currentUser]) => ({
        projects,
        currentUser
      }))
    );
  }


  //Get a single project by ID
  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(`/api/Project/GetProject/${id}`);
  }

  // Create a new project
  createProject(project: Project): Observable<Project> {
    const body = {
      name: project.name,
      description: project.description,
      status: project.status,
      createdBy: project.createdBy
    };

    return this.http.post<Project>('/api/Project/CreateProject', body);
  }

  // Update an existing project
  updateProject(project: Project): Observable<Project> {
    const body = {
      name: project.name,
      description: project.description,
      status: project.status
    };

    return this.http.put<Project>(`/api/Project/UpdateProject/${project.id}`, body);
  }

  canEditProject(project: Project): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user => {
        if (!user) return false;

        // Admin can edit all projects
        if (this.authService.isAdmin()) {
          return true;
        }

        // users can only edit their own projects
        return project.createdBy === user.id;
      })
    );
  }

  // checks if a user can edit
  canEditProjectSync(project: Project): boolean {
    const user = this.authService.currentUserValue;

    if (!user) return false;

    // Admin can edit all projects
    if (this.authService.isAdmin()) {
      return true;
    }

    // Regular users can only edit their own projects
    return project.createdBy === user.id;
  }


  getMyProjects(): Observable<Project[]> {
    return combineLatest([
      this.http.get<Project[]>('/api/Project/GetProjects'),
      this.authService.currentUser$
    ]).pipe(
      map(([projects, currentUser]) => {
        if (!currentUser) return [];
        return projects.filter(project => project.createdBy === currentUser.id);
      })
    );
  }


  // Tasks
  getProjectTask(projectId: string, taskId: string): Observable<ProjectTask> {
    return this.http.get<ProjectTask>(`/api/Project/${projectId}/tasks/${taskId}`);
  }

  addTask(projectId: string, title: string, description: string, status: number, assignedTo: string): Observable<ProjectTask> {
    const body = {
      title: title,
      description: description,
      status: status,
      assignedTo: assignedTo
    };

    return this.http.post<ProjectTask>(`/api/Project/${projectId}/tasks/`, body);
  }

  updateTask(projectId: string, taskId: string, title: string, description: string, status: number, assignedTo: string): Observable<ProjectTask> {
    const body = {
      title: title,
      description: description,
      status: status,
      assignedTo: assignedTo
    };

    return this.http.put<ProjectTask>(`/api/Project/${projectId}/tasks/${taskId}`, body);
  }

  deleteTask(projectId: string, taskId: string): Observable<void> {
    return this.http.delete<void>(`/api/Project/${projectId}/tasks/${taskId}`);
  }

}