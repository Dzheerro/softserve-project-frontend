import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateTrackService } from '../../../services/artist/create-track.service';

@Component({
  selector: 'app-create-track',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-track.component.html',
  styleUrl: './create-track.component.scss'
})

export class CreateTrackComponent {
    title: string = '';
    file: File | undefined;
    result: any = '';
    albumCoverFile: File | undefined;
albumName: any;
  
    constructor(private createTrackService: CreateTrackService, private router: Router) {}
  
    onAddTrack() {
      if (!this.file) {
        console.error('Please select a track file');
        return;
      }
  
      this.createTrackService.addTrack(this.title, this.file).subscribe((res: any) => {
        this.result = res;
        if (this.result.success === true) {
          this.router.navigate(['/dashboard']);
        }
      });
    }
  
    onTrackFileChange(event: any) {
      if (event.target.files.length > 0) {
        this.file = event.target.files[0];
      }
    }
    onAlbumCoverChange(event: any) {
        if (event.target.files.length > 0) {
            this.albumCoverFile = event.target.files[0];
        }
    }
  }

