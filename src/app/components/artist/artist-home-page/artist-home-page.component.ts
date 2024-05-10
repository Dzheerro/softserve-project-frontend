import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../landing-page/navbar/navbar.component';
import { FooterComponent } from '../../landing-page/footer/footer.component';

@Component({
  selector: 'app-artist-home-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './artist-home-page.component.html',
  styleUrl: './artist-home-page.component.scss'
})
export class ArtistHomePageComponent {
  
  constructor() {}

}
