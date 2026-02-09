import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard'; 

export const routes: Routes = [{
    path:'',
    pathMatch: 'full',
    loadComponent: () => {
        return import('./home/home.component').then((m) => m.HomeComponent)
    },
    canActivate: [authGuard] 
},
{
    path:'projects',
    pathMatch: 'full',
    loadComponent: () => {
        return import('./projects/projects.component').then((m) => m.ProjectsComponent)
    },
    canActivate: [authGuard] 
},
{
    path:'project/:Id',
    pathMatch: 'full',
    loadComponent: () => {
        return import('./project-detail/project-detail.component').then((m) => m.ProjectDetailComponent)
    },
    canActivate: [authGuard] 
},
{
    path:'task/:projectId/:taskId',
    pathMatch: 'full',
    loadComponent: () => {
        return import('./task-detail/task-detail.component').then((m) => m.TaskDetailComponent)
    },
    canActivate: [authGuard] 
},
{
    path:'login',
    pathMatch: 'full',
    loadComponent: () => {
        return import('./login/login.component').then((m) => m.LoginComponent)
    }
}];
