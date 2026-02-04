import { Routes } from '@angular/router';

export const routes: Routes = [{
    path:'home',
    pathMatch: 'full',
    loadComponent: () => {
        return import('./home/home.component').then((m) => m.HomeComponent)
    },
},
{
    path:'projects',
    pathMatch: 'full',
    loadComponent: () => {
        return import('./projects/projects.component').then((m) => m.ProjectsComponent)
    },
}];
