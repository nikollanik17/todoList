import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { SingleTaskComponent } from './components/single-task/single-task.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
    canActivate: [LoggedOutGuard],
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent,
    canActivate: [LoggedOutGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    component: TasksListComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: 'task/:id',
    pathMatch: 'full',
    component: SingleTaskComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: 'account',
    pathMatch: 'full',
    component: AccountComponent,
    canActivate: [LoggedInGuard],
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
