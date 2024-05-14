import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../landing-page/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../landing-page/footer/footer.component';
import { ActionsTrackService } from '../../services/actions/actions.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink, CommonModule],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss'
})
export class PlaylistsComponent implements OnInit{

  playlists: any;

  constructor(private actionService$: ActionsTrackService) {}

  ngOnInit(): void {
    this.getPlaylist$();
  }

  getPlaylist$() {
    this.actionService$.getPlaylist().subscribe( (result: any) => {
      this.playlists = result.data;
    })
  };

}
