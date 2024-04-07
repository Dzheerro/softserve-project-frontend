import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SliderComponent } from '../slider/slider.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavbarComponent, SliderComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})

export class MainComponent {
  baseUrl: string = environment.baseUrl;
  responseData: any = '';
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef;

  constructor(private http: HttpClient) {}

  showTrack() {
    this.http.get(this.baseUrl + 'api/v1/tracks').subscribe((res: any) => {
      this.responseData = res;
      console.log('RESULT', this.responseData.data);
    });
  }

  playTrack(trackId: number) {
    const audioPlayer: HTMLAudioElement = this.audioPlayerRef.nativeElement;
    const trackUrl = `${this.baseUrl}api/v1/tracks/?track_id=${trackId}`;
    audioPlayer.src = trackUrl;
    audioPlayer.play();
  }
}