import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../users/auth.service';

// tengo que definir token
export const loginGuard = () => {
  const router = inject(Router);
  AuthService;
  if (localStorage.getItem('token')) {
    return true;
  } else {
    router.navigate(['/login']);
    alert('Tienes que iniciar sesión');
    return false;
  }
};
