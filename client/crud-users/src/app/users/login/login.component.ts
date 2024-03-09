import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form!: FormGroup;
  error!: string;

  constructor(public User: UserService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  submit() {
    // Hago match con las credenciales, y devuelvo todos sus datos. hasta la contraseña!!!
    this.User.login(this.form.value.email).subscribe((res: any) => {
      if (!res.error) {
        this.router.navigateByUrl('users/index');
        if (res.user.role == 'ROLE_ADMIN') {
          //Estoy utilizando behavior subject para comunicarme con componentes
          this.User.typeAdmin(true);
        }
        this.User.setUserId(res.user.id);
      } else {
        console.log(res.error);
      }
    });
  }
}
