import { Component } from '@angular/core';
import { NavbarComponent } from '../landing-page/navbar/navbar.component';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss'
})
export class PlaylistsComponent {

}
