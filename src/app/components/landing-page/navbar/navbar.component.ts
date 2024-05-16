import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UserDataJwtService } from '../../../services/auth/user-data-jwt.service';
import { AuthService } from '../../../services/auth/auth.service';
import { environment } from '../../../../environments/environment';
import { TokenInterceptor } from '../../../helpers/token.interceptor';

import { TieredMenuModule } from 'primeng/tieredmenu';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';

import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ActionsTrackService } from '../../../services/actions/actions.service';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, TieredMenuModule, ButtonModule, AvatarModule, BadgeModule, AutoCompleteModule, FloatLabelModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  username: string | null;
  profileType: string | null;
  userId: any;

  searchQuery: string = '';
  searchResults!: any[];
  selectedItem: any;

  searchTrack: any;
  searchArtist: any;
  searchAlbum: any;

  items: MenuItem[] | undefined;

  baseUrl: string = environment.baseUrl;

  constructor(private userDataJwtService: UserDataJwtService, private authService: AuthService, private router: Router, private actionService$: ActionsTrackService) {
    this.username = this.userDataJwtService.getUsername();
    this.profileType = this.userDataJwtService.getUserProfileType();
    this.userId = this.userDataJwtService.getUserId();
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
    ];
  }

  search(event: any) {
    const query = event.query;
    
    this.searchByTracks$(query);
    this.searchByAlbums$(query);
    this.searchByArtist$(query);
    
    this.searchResults = [
      ...(this.searchTrack ? this.searchTrack.map((track: any) => track.title) : []),
      ...(this.searchAlbum ? this.searchAlbum.map((album: any) => album.name) : []),
      ...(this.searchArtist ? this.searchArtist.map((artist: any) => artist.username) : [])
    ];
  }

  searchByTracks$(track_name: string) {
    this.actionService$.searchByTracks(track_name).subscribe( (result: any) => {
      this.searchTrack = result.data;
    })
  }

  searchByAlbums$(album_name: string) {
    this.actionService$.searchByAlbums(album_name).subscribe( (result: any) => {
      this.searchAlbum = result.data;
    })
  }

  searchByArtist$(artist_name: string) {
    this.actionService$.searchByArtist(artist_name).subscribe( (result: any) => {
      this.searchArtist = result.data;
    })
  }


  isArtist(): boolean {
    return this.profileType === 'Artist';
  }

  isListener(): boolean {
    return this.profileType === 'Listener'
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
