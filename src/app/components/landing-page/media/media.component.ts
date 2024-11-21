import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActionsTrackService } from '../../../services/actions/actions.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss',
})
export class MediaComponent implements OnInit {
  tracks: any;
  artists: any;

  constructor(private showTrackService: ActionsTrackService) {}

  ngOnInit(): void {
    this.getArtists();
    this.getTracks();
  }

  getTracks() {
    this.showTrackService.showTrack().subscribe((result) => {
      this.tracks = result;
    });
  }

  getArtists() {
    this.showTrackService.getArtist().subscribe((result: any) => {
      this.artists = result.data;
    });
  }
}
