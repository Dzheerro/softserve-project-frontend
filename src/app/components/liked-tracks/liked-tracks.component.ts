import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-liked-tracks',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './liked-tracks.component.html',
  styleUrl: './liked-tracks.component.scss'
})
export class LikedTracksComponent {

}
