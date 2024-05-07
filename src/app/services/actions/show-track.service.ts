import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShowTrackService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  showTrack(): Observable <any> {
    return this.http.get(this.baseUrl + 'api/v1/tracks');
  }

  getTrack(trackId: number) {
    return this.http.get(this.baseUrl + `api/v1/tracks/?track_id=${trackId}`);
  }

  getTrackFile(trackId: number) {
    return this.http.get(this.baseUrl + `api/v1/tracks/?track_id_file=${trackId}`, {responseType: 'blob'})
  }

  addLike(trackId: number) {
    const requestData = {track_id: trackId};
    return this.http.post(this.baseUrl + 'api/v1/like_tracks/', requestData);
  }

  removeLike(trackId: number) {
    return this.http.delete(`${this.baseUrl}api/v1/like_tracks/${trackId}`);
  }

  getLikedTracks() {
    return this.http.get(this.baseUrl + 'api/v1/like_tracks/');
  }
}
