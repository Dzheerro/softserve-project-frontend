import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserDataJwtService } from '../../services/auth/user-data-jwt.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { environment } from '../../../environments/environment';
import { TokenInterceptor } from '../../helpers/token.interceptor';

 
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  username: string | null;
  profileType: string | null;
  baseUrl: string = environment.baseUrl;

  constructor (private userDataJwtService: UserDataJwtService, private http: HttpClient, private authService: AuthService, private router: Router) {
    this.username = this.userDataJwtService.getUsername();
    this.profileType = this.userDataJwtService.getUserProfileType();
  }

  isArtist(): boolean {
    return this.profileType === 'Artist';
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn$();
  }

  logOut() {
    this.authService.logOut().subscribe( () => {
      TokenInterceptor.accessToken = '';
      TokenInterceptor.refreshToken = '';
      localStorage.removeItem('Access');
      localStorage.removeItem('Refresh');
      localStorage.removeItem('profile_type');
      localStorage.removeItem('username');
      this.router.navigate(['/login']);
    })
  }
}
