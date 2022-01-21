import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskComponent } from './components/task/task.component';
import { AccountComponent } from './components/account/account.component';
import { HeaderComponent } from './components/header/header.component';
import { AUTH_PROVIDERS } from './services/auth.service';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoaderComponent } from './components/loader/loader.component';
import { FilterPipePipe } from './helpers/filter-pipe.pipe';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './services/task.service';
import { SingleTaskComponent } from './components/single-task/single-task.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TasksListComponent,
    TaskComponent,
    AccountComponent,
    HeaderComponent,
    LoaderComponent,
    FilterPipePipe,
    SingleTaskComponent,
    PageNotFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [AUTH_PROVIDERS, LoggedInGuard, TaskService],
  bootstrap: [AppComponent],
})
export class AppModule {}
