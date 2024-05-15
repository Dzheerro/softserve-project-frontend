import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../landing-page/navbar/navbar.component';
import { FooterComponent } from '../landing-page/footer/footer.component';
import { ActionsTrackService } from '../../services/actions/actions.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-liked-tracks',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, RouterLink],
  templateUrl: './liked-tracks.component.html',
  styleUrl: './liked-tracks.component.scss'
})
export class LikedTracksComponent implements OnInit{

  trackTitle!: string;
  trackId!: number
  trackFile: any

  tracks!: any

  constructor (private trackService: ActionsTrackService) {}

  ngOnInit(): void {
    this.getLikedTracks$()
  }

  getLikedTracks$ () {
    this.trackService.getLikedTracks().subscribe( (response) => {
      this.tracks = response;
    })
  }

  removeLike(trackId: number) {
    this.trackService.removeLike(trackId).subscribe( (response) => {
      console.log(response);
      
    })
  }

}
