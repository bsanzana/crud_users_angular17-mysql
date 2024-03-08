import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../users/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  router = inject(Router);
  userService = inject(UserService);
  userLoginOn: boolean = false;

  ngOnInit(): void {
    this.userService.currentUserLogInOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
  }

  Logout() {
    //Seteamos los valores a false
    this.userService.logout(false);
    this.userService.typeAdmin(false);
    this.userService.setUserId(0);
    this.router.navigate(['/login']);
  }

  verificarUrl(url: string): boolean {
    return this.router.url.includes(url);
  }
}
