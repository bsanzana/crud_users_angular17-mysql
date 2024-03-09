import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { UserService } from '../user.service';

import { Router, RouterLink } from '@angular/router';

import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create',

  standalone: true,

  imports: [CommonModule, ReactiveFormsModule, RouterLink],

  templateUrl: './create.component.html',

  styleUrl: './create.component.css',
})
export class CreateComponent {
  form!: FormGroup;

  userAdmin: boolean = false;

  roles: string[] = ['ROLE_USER', 'ROLE_ADMIN'];

  constructor(
    public User: UserService,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      user: new FormControl('', [Validators.required]),

      email: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', Validators.required),

      role: new FormControl('ROLE_USER', Validators.required),
    });

    this.User.currentUserAdmin.subscribe({
      next: (userAdmin) => {
        this.userAdmin = userAdmin;
      },
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.User.create(this.form.value).subscribe((res: any) => {
      console.log('Usuario creado con exito!');

      this.router.navigateByUrl('users/index');
    });
  }
}
