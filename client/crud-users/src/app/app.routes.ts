import { Routes } from '@angular/router';
import { IndexComponent } from './users/index/index.component';
import { CreateComponent } from './users/create/create.component';
import { EditComponent } from './users/edit/edit.component';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'users/index', component: IndexComponent },

  {
    path: 'users/create',
    component: CreateComponent,
  },

  {
    path: 'users/:userId/edit',
    component: EditComponent,
  },

  { path: 'register', component: RegisterComponent },

  { path: 'login', component: LoginComponent },

  { path: '**', redirectTo: 'login' },
];
