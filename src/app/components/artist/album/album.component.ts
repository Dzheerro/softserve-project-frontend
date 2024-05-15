import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../landing-page/navbar/navbar.component';
import { FooterComponent } from '../../landing-page/footer/footer.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ActionsTrackService } from '../../../services/actions/actions.service';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent implements OnInit{

  constructor(private actionService$: ActionsTrackService, private route: ActivatedRoute) {}

  albums: any;

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums() {
    this.actionService$.getAlbumInfoAboutArtist().subscribe( (result: any) => {      
      this.albums = result.data;
    })
  }
}
