import { Routes } from '@angular/router';
import { IndexComponent } from './users/index/index.component';
import { CreateComponent } from './users/create/create.component';
import { EditComponent } from './users/edit/edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'users/index', pathMatch: 'full' },
  { path: 'users/index', component: IndexComponent },

  { path: 'users/create', component: CreateComponent },

  { path: 'users/:userId/edit', component: EditComponent },
];
