import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ShowTrackService } from '../../services/show-track.service';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule],
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
