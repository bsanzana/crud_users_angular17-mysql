import { Component } from '@angular/core';
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

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.router.url);

    this.userService.getAll().subscribe((data: User[]) => {
      this.users = data;

      //console.log(this.users);
    });
  }

  deletePost(id: number) {
    this.userService.delete(id).subscribe((res) => {
      this.users = this.users.filter((item) => item.id !== id);

      console.log('Usuario elimnado');
    });
  }
}
