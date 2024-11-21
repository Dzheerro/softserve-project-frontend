import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserDataJwtService } from '../../../services/auth/user-data-jwt.service';
import { TokenInterceptor } from '../../../helpers/token.interceptor';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  responseData: any;
  decodedToken: any;
  checkTokenToExpired: any;

  helper = new JwtHelperService();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userDataJwtService: UserDataJwtService,
    private router: Router,
  ) {}

  onSubmit() {
    if (this.form.valid) {
      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;

      if (username && password) {
        this.authService.login(username, password).subscribe((result) => {
          if (result !== null) {
            this.responseData = result;

            if (this.responseData.success === true) {
              if (this.responseData.tokens) {
                this.router.navigate(['/dashboard']);

                /*` Adding Tokens To Local Storage `*/
                localStorage.setItem('Access', this.responseData.tokens.access);
                localStorage.setItem(
                  'Refresh',
                  this.responseData.tokens.refresh,
                );

                /*` Setting Tokens in Methods `*/
                TokenInterceptor.accessToken = this.responseData.tokens.access;
                TokenInterceptor.refreshToken =
                  this.responseData.tokens.refresh;
                TokenInterceptor.decodedToken = this.decodedToken;

                /*` Decoding Access Token ang Setting Data in Methods `*/
                this.decodedToken = this.helper.decodeToken(
                  this.responseData.tokens.access,
                );
                this.userDataJwtService.setProfileType(
                  this.decodedToken.profile_type,
                );
                this.userDataJwtService.setUsername(this.decodedToken.username);
                this.userDataJwtService.setUserId(this.decodedToken.user_id);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
              }
            }
          }
        });
      }
    }
  }
}
