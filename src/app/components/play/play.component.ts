import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { NavbarComponent } from '../landing-page/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../landing-page/footer/footer.component';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { ActionsTrackService } from '../../services/actions/actions.service';
import { environment } from '../../../environments/environment';

import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, TieredMenuModule, ButtonModule],
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
  trackArtist!: string;
  
  playlistId!: number;
  playlistTitle!: string;

  albums: any;
  albumId!: number

  isLiked: boolean = false;
  isPlaying: boolean = false;

  trackDuration: any;
  currentTime: any;

  items: MenuItem[] | undefined;

  constructor (private trackService: ActionsTrackService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.trackId = +params['id'];
      this.trackUrl = `${this.baseUrl}api/v1/tracks/?track_id_file=${this.trackId}`;
    });

    if (this.trackId) {
      this.getTrackInfo$(this.trackId);
      this.getTrackFile$(this.trackId);
      this.getAvailablePlaylists$();
      this.getAvailableAlbums$();

      this.trackDuration = '0:00';
      this.currentTime = '0:00';
    }
  }

  ngAfterViewInit(): void {
    this.audioPlayer = this.player.nativeElement;
    this.loadTrack();
    this.updateTrackInfo();
  }

  putTrackIntoPlaylist$(playlistId: number, trackId: number) {
    this.trackService.putTrackIntoPlaylist(playlistId, trackId).subscribe();
  }

  putTrackIntoAlbum$(albumId: number, trackId: number) {
    this.trackService.putTrackIntoAlbum(albumId, trackId).subscribe();
  } 

  getAvailableAlbums$() {
    this.trackService.getAlbumInfoAboutArtist().subscribe( (result: any) => {
      this.albums = result.data;
    })
  }

  getAvailablePlaylists$() {
    this.trackService.getPlaylist().subscribe((result: any) => {
  
      const playlistsWithTitles = result.data.map((playlist: any) => ({
        id: playlist.id,
        title: playlist.title
      }));
  
      this.items = [
        {
          label: 'Add Like',
          icon: 'pi pi-thumbs-up',
          command: () => this.addLike$(this.trackId)
        },
        {
          label: 'Add to Playlist',
          icon: 'pi pi-list',
          items: playlistsWithTitles.map((playlist: any) => ({
            label: playlist.title,
            command: () => this.putTrackIntoPlaylist$(playlist.id, this.trackId)
          }))
        }   
      ];
    });
  };
  
  addLike$(trackId: number) {
    this.trackService.addLike(trackId).subscribe((result) => {
      console.log(result);
    })
  } 

  removeLike$(trackId: number) {
    this.trackService.removeLike(trackId).subscribe((result) => {
      console.log(result);
    })
  }

  getTrackInfo$(trackId: number) {
    this.trackService.getTrack(trackId).subscribe((result: any) => {
      this.trackTitle = result.data.title;
      this.trackArtist = result.data.artist.username;
      
      if (result.liked === true) {
        this.isLiked = true;
      }
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