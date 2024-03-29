import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

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

  constructor(private authService: AuthService, private router: Router) { }

  reloadPage(): void {
    window.location.reload();
  }

  onSubmit() {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(result => {
      if (result !== null) {
        this.responseData = result;
        if (this.responseData.tokens) {
          this.authService.setAuthToken(this.responseData.tokens.access);
          this.authService.setRefreshToken(this.responseData.tokens.refresh);
          this.router.navigate(["/dashboard"]);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.reloadPage();
        }
      }
    });
  }  
};
