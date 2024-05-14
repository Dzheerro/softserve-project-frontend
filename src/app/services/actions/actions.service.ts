import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ActionsTrackService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  showTrack() {
    return this.http.get(this.baseUrl + 'api/v1/tracks');
  }

  getArtist() {
    return this.http.get(this.baseUrl + 'api/v1/user/artists');
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
    const requestData = { track_id: trackId };
    return this.http.put(this.baseUrl + 'api/v1/like_tracks/', requestData);
  }
    
  getLikedTracks() {
    return this.http.get(this.baseUrl + 'api/v1/like_tracks/');
  }

  getPlaylist() {
    return this.http.get(this.baseUrl + 'api/v1/playlists/');
  }

  putTrackIntoPlaylist(playlistId: number, trackId: number) {
    const requestData = { playlist_id: playlistId, track_ids: [trackId] };
    return this.http.put(this.baseUrl + 'api/v1/playlists/', requestData);
  }

  getInfoForSomeArtist(id: number) {
    return this.http.get(`${this.baseUrl}api/v1/user/artists/${id}/`);
  }
  
  getTrackInfoForSomeArtist(id: number) {
    return this.http.get(`${this.baseUrl}api/v1/page_artist/${id}/`);
  }
  
}
