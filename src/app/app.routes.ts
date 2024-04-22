import { Routes } from '@angular/router';

import { RegisterComponent } from './components/authorization/register/register.component';
import { MainComponent } from './components/landing-page/main/main.component';
import { LoginComponent } from './components/authorization/login/login.component';
import { CreateTrackComponent } from './components/artist/create-track/create-track.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { LikedTracksComponent } from './components/liked-tracks/liked-tracks.component';
import { CreatePlaylistComponent } from './components/create-playlist/create-playlist.component';


export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    
    { path: 'dashboard', component: MainComponent},
    { path: 'artist/create-track', component: CreateTrackComponent},
    { path: 'create-playlist', component: CreatePlaylistComponent},

    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    
    { path: 'playlists', component: PlaylistsComponent},
    { path: 'likes', component: LikedTracksComponent}
];
