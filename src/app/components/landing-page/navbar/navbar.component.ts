import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { UserDataJwtService } from '../../../services/auth/user-data-jwt.service';
import { AuthService } from '../../../services/auth/auth.service';
import { environment } from '../../../../environments/environment';
import { TokenInterceptor } from '../../../helpers/token.interceptor';

import { TieredMenuModule } from 'primeng/tieredmenu';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, TieredMenuModule, ButtonModule, AvatarModule, BadgeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  username: string | null;
  profileType: string | null;
  items: MenuItem[] | undefined;

  baseUrl: string = environment.baseUrl;

  constructor(private userDataJwtService: UserDataJwtService, private authService: AuthService, private router: Router) {
    this.username = this.userDataJwtService.getUsername();
    this.profileType = this.userDataJwtService.getUserProfileType();
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Liked Tracks',
        icon: 'pi pi-thumbs-up',
        command: () => this.router.navigate(['/likes'])
      },
      {
        label: 'Playlists',
        icon: 'pi pi-list',
        command: () => this.router.navigate(['/playlists'])
      },
      {
        label: 'Albums',
        icon: 'pi pi-objects-column',
        command: () => this.router.navigate(['/artist/albums'])
      },
      {
        label: 'Settings',
        icon: 'pi pi-sliders-h'
      },
      {
        label: 'Log Out',
        icon: 'pi pi-sign-out',
        command: () => this.logOut()
      },
    ]
  }

  isArtist(): boolean {
    return this.profileType === 'Artist';
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn$();
  }

  logOut() {
    this.authService.logOut().subscribe(() => {
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
