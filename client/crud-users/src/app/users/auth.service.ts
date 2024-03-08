import { Injectable, signal } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUsersig = signal<User | undefined | null>(undefined);
  constructor() {}
}
