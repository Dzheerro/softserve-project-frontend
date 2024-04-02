import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserDataJwtService } from '../../services/user-data-jwt.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form: any = {
    username: null,
    password: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  responseData: any;
  decodedToken: any;

  helper = new JwtHelperService;

  constructor(private authService: AuthService,private userDataJwtService: UserDataJwtService , private router: Router) { }

  reloadPage(): void {
    window.location.reload();
  }

  onSubmit() {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(result => {
      if (result !== null) {
        this.responseData = result;

        if (this.responseData.success === true) {
          if (this.responseData.tokens) {
            this.router.navigate(["/dashboard"]);
            
            /*` Adding Tokens To Local Storage `*/
            localStorage.setItem('Access', this.responseData.tokens.access);
            localStorage.setItem('Refresh', this.responseData.tokens.refresh);

            /*` Setting Tokens in Methods `*/
            this.authService.setAuthToken(this.responseData.tokens.access);
            this.authService.setRefreshToken(this.responseData.tokens.refresh);

            /*` Decoding Access Token ang Setting Data in Methods `*/
            this.decodedToken = this.helper.decodeToken(this.responseData.tokens.access);
            this.userDataJwtService.setProfileType(this.decodedToken.profile_type);
            this.userDataJwtService.setUsername(this.decodedToken.username);
            
            this.isLoginFailed = false;
            this.isLoggedIn = true;
          }
        }
      }
    });
  }
};
