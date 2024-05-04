import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../landing-page/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../landing-page/footer/footer.component';
import { ActivatedRoute, Params } from '@angular/router';
import { ShowTrackService } from '../../services/actions/show-track.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent implements AfterViewInit{

  trackId: any;
  responseData: any = '';
  baseUrl: string = environment.baseUrl;
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef;

  constructor(private route: ActivatedRoute, private trackService: ShowTrackService) {}

  isPlayed: boolean = false;
  duration: string = '3:14'
  trackDuration: any;

  ngAfterViewInit(): void {
    this.playTrack();
  }

  playTrack() {
    this.route.params.subscribe((param: Params) => {
      this.trackId = +param['id'];
      this.trackService.playTrack(this.trackId);
    })
  }
}
