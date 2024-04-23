import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ShowTrackService } from '../../../services/actions/show-track.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss'
})
export class MediaComponent implements OnInit {

  tracks: any;

  constructor(private showTrackService: ShowTrackService) { }

  ngOnInit(): void {
    this.showTrackService.showTrack().subscribe((result) => {
      this.tracks = result;
    });
  }

  
}
