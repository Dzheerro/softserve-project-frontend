import { Component } from '@angular/core';
import { NavbarComponent } from '../landing-page/navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss'
})
export class PlaylistsComponent {

}
