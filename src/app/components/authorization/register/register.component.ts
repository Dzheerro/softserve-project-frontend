import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.email],
    phone_number: ['', Validators.required],
    password: ['', Validators.required],
    profile_type: false,
  });

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  onSubmit(): void {
    if (this.form.valid) {
      const first_name = this.form.get('first_name')?.value ?? '';
      const last_name = this.form.get('last_name')?.value ?? '';
      const username = this.form.get('username')?.value ?? '';
      const email = this.form.get('email')?.value ?? '';
      const phone_number = this.form.get('phone_number')?.value ?? '';
      const password = this.form.get('password')?.value ?? '';
      const isArtist = this.form.get('profile_type')?.value ?? false;

      this.authService
        .register(
          first_name,
          last_name,
          username,
          email,
          phone_number,
          password,
          isArtist,
        )
        .subscribe({
          next: (data) => {
            if (data.success === true) {
              this.router.navigate(['/login']);
              this.isSuccessful = true;
              this.isSignUpFailed = false;
            }
          },
          error: (err) => {
            console.error('Registration failed:', err);
            this.isSuccessful = false;
            this.isSignUpFailed = true;
            this.errorMessage = err.message;
          },
        });
    }
  }
}
