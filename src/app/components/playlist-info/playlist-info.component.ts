import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../landing-page/navbar/navbar.component';
import { FooterComponent } from '../landing-page/footer/footer.component';
import { ActionsTrackService } from '../../services/actions/actions.service';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';

@Component({
  selector: 'app-playlist-info',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './playlist-info.component.html',
  styleUrl: './playlist-info.component.scss',
})
export class PlaylistInfoComponent implements OnInit {
  constructor(
    private actionService$: ActionsTrackService,
    private router: ActivatedRoute,
  ) {}

  playlistInfo: any;
  playlistId!: number;
  playlistTitle!: string;

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.playlistId = +params['id'];
    });

    this.getPlaylistInfo(this.playlistId);
  }

  getPlaylistInfo(id: number) {
    this.actionService$.getPlaylistInfo(id).subscribe((result: any) => {
      this.playlistInfo = result.data.tracks;
      console.log(this.playlistInfo);

      this.playlistTitle = result.data.title;
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate =
      this.formatNumber(date.getDate(), 2) +
      '.' +
      this.formatNumber(date.getMonth() + 1, 2) +
      '.' +
      date.getFullYear().toString().slice(-2);
    return formattedDate;
  }

  private formatNumber(num: number, length: number): string {
    return ('0' + num).slice(-length);
  }
}
