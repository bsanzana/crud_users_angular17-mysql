import { Component, inject } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  users: User[] = [];
  userLoginOn: boolean = false;
  userAdmin: boolean = false;
  userId: number = 0;
  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.currentUserLogInOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });

    this.userService.currentUserAdmin.subscribe({
      next: (userAdmin) => {
        this.userAdmin = userAdmin;
      },
    });

    this.userService.currentUserId.subscribe({
      next: (userId) => {
        this.userId = userId;
      },
    });

    // Si es admin muestra todo
    if (this.userAdmin == true) {
      this.userService.getAll().subscribe((data: User[]) => {
        this.users = data;
      });
    } else {
      // De lo contrario solo trae la información del usuario por su id
      this.userService.find(this.userId).subscribe((data: User) => {
        this.users = [data];
      });
    }
  }

  deletePost(id: number) {
    this.userService.delete(id).subscribe((res) => {
      this.users = this.users.filter((item) => item.id !== id);

      alert('Usuario Eliminado!');
    });
  }
}
