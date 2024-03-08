import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  form!: FormGroup;

  constructor(public User: UserService, private router: Router) {
    this.form = new FormGroup({
      user: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  submit() {
    // Peligroso, me pueden colocar un ROLE_ADMIN
    this.form.value['role'] = 'ROLE_USER';

    this.User.create(this.form.value).subscribe((res: any) => {
      this.router.navigateByUrl('login');
      alert('Usuario creado con exito, inicia sesión.');
    });
  }
}
