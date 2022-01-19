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
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [AUTH_PROVIDERS, LoggedInGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
