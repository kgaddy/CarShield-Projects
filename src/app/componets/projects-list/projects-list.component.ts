import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { Project, ProjectStatus } from '../../models/project';
import { User } from '../../models/auth';


@Component({
  selector: 'app-projects-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss'
})

export class ProjectsListComponent {
  @Input() projects: Project[] = [];
  @Input() currentUser: User | null = null;
  //@Input() showActions: boolean = true;
  ProjectStatus = ProjectStatus;

  @Output() deleteProject = new EventEmitter<string>();
  @Output() editProject = new EventEmitter<string>();

  canEdit(project: Project): boolean {
    return this.currentUser?.id === project.createdBy;
  }

  onDeleteProject(projectId: string): void {
    this.deleteProject.emit(projectId);
  }

}
