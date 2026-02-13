import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project, ProjectStatus, ProjectTask, TaskStatus } from '../../models/project';
import { User } from '../../models/auth';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  @Input() projectTasks: ProjectTask[] = [];
  @Input() currentUser: User | null = null;
  TaskStatus = TaskStatus;
}
