import { Routes } from '@angular/router';

import { RegisterComponent } from './components/authorization/register/register.component';
import { MainComponent } from './components/landing-page/main/main.component';
import { LoginComponent } from './components/authorization/login/login.component';
import { CreateTrackComponent } from './components/artist/create-track/create-track.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { LikedTracksComponent } from './components/liked-tracks/liked-tracks.component';
import { CreatePlaylistComponent } from './components/create-playlist/create-playlist.component';
import { PlayComponent } from './components/play/play.component';
import { CreateAlbumComponent } from './components/artist/create-album/create-album.component';
import { AlbumComponent } from './components/artist/album/album.component';
import { ArtistHomePageComponent } from './components/artist/artist-home-page/artist-home-page.component';
import { UserHomePageComponent } from './components/user/user-home-page/user-home-page.component';


export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    
    { path: 'dashboard', component: MainComponent},
    { path: 'artist/create-track', component: CreateTrackComponent},
    { path: 'create-playlist', component: CreatePlaylistComponent},

    { path: 'signup', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    
    { path: 'playlists', component: PlaylistsComponent},
    { path: 'likes', component: LikedTracksComponent},
    { path: 'player/:id', component: PlayComponent},

    { path: 'artist/create-album', component: CreateAlbumComponent},
    { path: 'artist/albums', component: AlbumComponent},
    { path: 'artist/:id', component: ArtistHomePageComponent},
    { path: 'user/:id', component: UserHomePageComponent},

    { path: '**', redirectTo: '/dashboard'}
    
];
