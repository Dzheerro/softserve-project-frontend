import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form: any = {
    first_name: null,
    last_name: null,
    username: null,
    email: null,
    phone_number: null,
    password: null,
    isArtist: false
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    const { first_name, last_name, username, email, phone_number, password, isArtist } = this.form;

    this.authService.register(first_name, last_name, username, email, phone_number, password, isArtist).subscribe({
      next: data => {
        if (data.success === true) {
          this.router.navigate(['/login']);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        }
      }
    })
  }
}