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

  async playTrack(trackId: number) {
    return this.http.get(this.baseUrl + `api/v1/tracks/?track_id=${trackId}`, { responseType:'blob'}).subscribe(async (response) => {
      this.baseUrl + `api/v1/tracks/?track_id=${trackId}`
      const audioContext = new window.AudioContext();
      audioContext.resume();

      const buffer = await response.arrayBuffer();
      audioContext.decodeAudioData(buffer, function (buffer) {
        let duration = buffer.duration
        console.log(duration);
      })
    })
  }
}
