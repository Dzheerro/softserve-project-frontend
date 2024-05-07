import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../landing-page/navbar/navbar.component';
import { FooterComponent } from '../landing-page/footer/footer.component';
import { ShowTrackService } from '../../services/actions/show-track.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liked-tracks',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './liked-tracks.component.html',
  styleUrl: './liked-tracks.component.scss'
})
export class LikedTracksComponent implements OnInit{

  trackTitle!: string;
  trackId!: number
  trackFile: any

  tracks!: any

  constructor (private trackService: ShowTrackService) {}

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
