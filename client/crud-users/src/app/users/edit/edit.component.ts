import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { UserService } from '../user.service';

import { ActivatedRoute, Router } from '@angular/router';

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

  imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './edit.component.html',

  styleUrl: './edit.component.css',
})
export class EditComponent {
  id!: number;

  form!: FormGroup;

  constructor(
    public userService: UserService,

    private route: ActivatedRoute,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['userId'];
    this.userService.find(this.id).subscribe((data: User) => {
      // this.userData = ;
      this.form.setValue(data);
    });

    this.form = new FormGroup({
      id: new FormControl('', [Validators.required]),
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

    this.userService.update(this.id, this.form.value).subscribe((res: any) => {
      console.log('Usuario Actualizado!');

      this.router.navigateByUrl('users/index');
    });
  }
}
