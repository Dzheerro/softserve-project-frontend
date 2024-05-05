import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../landing-page/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../landing-page/footer/footer.component';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { ShowTrackService } from '../../services/actions/show-track.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent implements OnInit, AfterViewInit {

  @ViewChild('player') player!: ElementRef;
  @ViewChild('progressed') progressed!: ElementRef;
  @ViewChild('bar') progress_bar!: ElementRef;

  baseUrl: string = environment.baseUrl;
  audioPlayer!: HTMLAudioElement;

  trackId!: number;
  trackUrl!: string;
  trackTitle!: string;

  isPlaying: boolean = false;

  trackDuration: any;
  currentTime: any;

  constructor (private trackService: ShowTrackService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.trackId = +params['id'];
      this.trackUrl = `${this.baseUrl}api/v1/tracks/?track_id_file=${this.trackId}`;
    });

    if (this.trackId) {
      this.getTrackInfo$(this.trackId);
      this.getTrackFile$(this.trackId);

      this.trackDuration = '0:00';
      this.currentTime = '0:00';
    }
  }

  ngAfterViewInit(): void {
    this.audioPlayer = this.player.nativeElement;
    this.loadTrack();
    this.updateTrackInfo();
  }

  getTrackInfo$(trackId: number) {
    this.trackService.getTrack(trackId).subscribe((result: any) => {
      this.trackTitle = result.data.title;
    })
  }

  getTrackFile$(trackId: number) {
    this.trackService.getTrackFile(trackId).subscribe((result: any) => {
      console.log(result);
    })
  }

  loadTrack() {
    this.audioPlayer.src = this.trackUrl;
    this.audioPlayer.load();
  }

  playTrack() {
    this.audioPlayer.play();
    this.isPlaying = true;
  }

  pauseTrack() {
    this.audioPlayer.pause();
    this.isPlaying = false;
  }

  updateTrackInfo() {
    this.audioPlayer.ontimeupdate = () => {
      this.progressed.nativeElement.style.width = Math.floor(this.audioPlayer.currentTime * 100 / this.audioPlayer.duration) + "%";
  
      this.currentTime = this.formatTime(this.audioPlayer.currentTime);
      if (!isNaN(this.audioPlayer.duration)) {
        this.trackDuration = this.formatTime(this.audioPlayer.duration);
      }
    };
  
    this.progress_bar.nativeElement.onclick = (event: MouseEvent) => {
      this.audioPlayer.currentTime = (event.offsetX / this.progress_bar.nativeElement.offsetWidth) * this.audioPlayer.duration;
      console.log((event.offsetX / this.progress_bar.nativeElement.offsetWidth) * this.audioPlayer.duration);
    }
  }

  formatTime(time: number): string {
    let formattedTime: string;
    const minutes: number = Math.floor(time / 60);
    const seconds: number = Math.floor(time % 60);
    return formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}