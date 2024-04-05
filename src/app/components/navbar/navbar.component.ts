import { Component} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserDataJwtService } from '../../services/user-data-jwt.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { TokenInterceptor } from '../../services/token.interceptor';

 
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  username: string | null;
  baseUrl: string = environment.baseUrl;
  refreshToken = localStorage.getItem('Refresh');

  constructor (private userDataJwtService: UserDataJwtService, private http: HttpClient, private authService: AuthService, private router: Router) {
    this.username = this.userDataJwtService.getUsername();
  }

  logOut() {
    this.authService.logOut().subscribe( () => {
      TokenInterceptor.accessToken = '';
      TokenInterceptor.refreshToken = '';
      localStorage.removeItem('Access');
      localStorage.removeItem('Refresh');
      this.router.navigate(['/login']);
    })
  }
}
