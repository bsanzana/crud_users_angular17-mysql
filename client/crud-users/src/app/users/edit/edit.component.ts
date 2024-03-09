import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { UserService } from '../user.service';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { User } from '../user';

import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit',

  standalone: true,

  imports: [CommonModule, ReactiveFormsModule, RouterLink],

  templateUrl: './edit.component.html',

  styleUrl: './edit.component.css',
})
export class EditComponent {
  id!: number;

  form!: FormGroup;

  userId: number = 0;

  roles: string[] = ['ROLE_USER', 'ROLE_ADMIN'];

  // Primero se verifica si el usuario es admin
  userAdmin: boolean = false;

  constructor(
    public userService: UserService,

    private route: ActivatedRoute,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.currentUserId.subscribe({
      next: (userId) => {
        this.userId = userId;
      },
    });

    this.userService.currentUserAdmin.subscribe({
      next: (userAdmin) => {
        this.userAdmin = userAdmin;
      },
    });

    this.id = this.route.snapshot.params['userId'];
    console.log(this.id);
    if (this.userAdmin || this.id == this.userId) {
      this.userService.find(this.id).subscribe((data: User) => {
        this.form.setValue(data);
      });
    }

    this.form = new FormGroup({
      id: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required]),

      email: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', Validators.required),

      role: new FormControl('ROLE_USER', Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);

    this.userService.update(this.id, this.form.value).subscribe((res: any) => {
      console.log('Usuario Actualizado!');

      this.router.navigate(['users/index']);
    });
  }
}
