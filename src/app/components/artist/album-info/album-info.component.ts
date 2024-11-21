import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../landing-page/navbar/navbar.component';
import { FooterComponent } from '../../landing-page/footer/footer.component';
import { ActionsTrackService } from '../../../services/actions/actions.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-album-info',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './album-info.component.html',
  styleUrl: './album-info.component.scss',
})
export class AlbumInfoComponent implements OnInit {
  constructor(
    private actionService$: ActionsTrackService,
    private route: ActivatedRoute,
  ) {}

  albumId!: number;
  albumName!: string;
  albums: any;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.albumId = +params['id'];
    });

    this.getAlbumById(this.albumId);
  }

  getAlbumById(id: number) {
    this.actionService$.getCertainAlbum(id).subscribe((result: any) => {
      this.albums = result.data;
      this.albumName = result.data.name;
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
