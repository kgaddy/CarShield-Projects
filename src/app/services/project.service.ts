import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Project } from '../models/project';
import { AuthService } from './auth.service';
import { User } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * Get all projects
   * All users can see all projects
   */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/api/Project/GetProjects');
  }

  /**
   * Get all projects with user context
   * Returns projects along with information about which ones the current user can edit
   */
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

  /**
   * Check if the current user can edit a specific project
   * - Admins can edit all projects
   * - Regular users can only edit projects they created
   */
  canEditProject(project: Project): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user => {
        if (!user) return false;
        
        // Admin can edit all projects
        if (this.authService.isAdmin()) {
          return true;
        }
        
        // Regular users can only edit their own projects
        return project.createdBy === user.id;
      })
    );
  }

  /**
   * Synchronous version - check if current user can edit a project
   * Useful for template expressions or quick checks
   */
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

  /**
   * Get only projects created by the current user
   */
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
}