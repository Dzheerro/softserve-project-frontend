import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private authToken: string | null = null;
  private refreshToken: string | null = null;

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(this.baseUrl + 'api/v1/auth/token/', { username, password }, httpOptions);
  };

  register(first_name: string, last_name: string, username: string, email: string, phone_number: string, password: string, isArtist: boolean): Observable<any> {
    const profileType = isArtist ? 'Artist' : 'Listener';
    const userParams = { first_name, last_name, username, email, phone_number, password, profile_type: profileType };
    return this.http.post(this.baseUrl + 'api/v1/auth/create_user/', userParams, httpOptions);
  };

  setAuthToken(token:string) {
    this.authToken = token;
    console.log('authToken:', this.authToken);
  }

  getAuthToken() {
    return this.authToken;
  }

  setRefreshToken(token: string) {
    this.refreshToken = token;
    console.log('refreshToken:', this.refreshToken);
  }

  getRefreshToken() {
    return this.refreshToken;
  }

}
