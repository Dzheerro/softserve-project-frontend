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
  artistUsername!: string;
  artistTracks: any;
  artistAlbums: any;
  
  constructor(private actionService$: ActionsTrackService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const artistId = +params['id'];
      this.getInfoForSomeArtist$(artistId);
      this.getTrackInfoForSomeArtist$(artistId);
      this.getAlbumInfoAboutArtist$();
    });
  }
  
  getInfoForSomeArtist$(id: number) {
    this.actionService$.getInfoForSomeArtist(id).subscribe((result: any) => {
      this.artistUsername = result.data.user.username
    });
  }
  
  getTrackInfoForSomeArtist$(id: number) {
    this.actionService$.getTrackInfoForSomeArtist(id).subscribe((result: any) => {
        this.artistTracks = result.data.tracks
    });
  }
  
  getAlbumInfoAboutArtist$() {
    this.actionService$.getAlbumInfoAboutArtist().subscribe( (result: any) => {
      this.artistAlbums = result.data;
    })
  }

}
