import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../landing-page/navbar/navbar.component';
import { FooterComponent } from '../../landing-page/footer/footer.component';
import { ActionsTrackService } from '../../../services/actions/actions.service';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';

@Component({
  selector: 'app-artist-home-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './artist-home-page.component.html',
  styleUrl: './artist-home-page.component.scss'
})
export class ArtistHomePageComponent implements OnInit{

  artistId!: number;
  artistPlaysCount!: number
  artistUsername!: string;
  artistTracks: any;
  artistAlbums: any;
  
  constructor(private actionService$: ActionsTrackService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.artistId = +params['id'];
      this.getInfoForSomeArtist$(this.artistId);

      this.getInfoAboutArtist$(this.artistId);
    });
  }
  
  getInfoForSomeArtist$(id: number) {
    this.actionService$.getInfoForSomeArtist(id).subscribe((result: any) => {
      this.artistUsername = result.data.user.username
      this.artistPlaysCount = result.data.total_listens;
    });
  }
  
  getInfoAboutArtist$(artistId: number) {
    this.actionService$.getTrackInfoForSomeArtist(artistId).subscribe( (response:any) => {
      
      
      this.artistAlbums = response.data.albums;
      this.artistTracks = response.data.tracks;
    })
  }
}
