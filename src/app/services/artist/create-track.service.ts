import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateTrackService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  addTrack(title: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    return this.http.post(this.baseUrl + 'api/v1/tracks/', formData);
  }
}
