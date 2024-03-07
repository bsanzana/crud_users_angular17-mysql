import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { UserService } from '../user.service';

import { Router } from '@angular/router';

import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create',

  standalone: true,

  imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './create.component.html',

  styleUrl: './create.component.css',
})
export class CreateComponent {
  form!: FormGroup;

  constructor(
    public User: UserService,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      user: new FormControl('', [Validators.required]),

      email: new FormControl('', Validators.required),

      password: new FormControl('', Validators.required),

      description: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);

    this.User.create(this.form.value).subscribe((res: any) => {
      console.log('Usuario creado con exito!');

      this.router.navigateByUrl('users/index');
    });
  }
}
