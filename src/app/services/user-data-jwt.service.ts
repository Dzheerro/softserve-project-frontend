import { Injectable } from '@angular/core';
import { JwtUtilsService } from './jwt-utils.service';
import { AuthService } from './auth.service';
import { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserDataJwtService {

  constructor(private decodedJwt: JwtUtilsService, private authService: AuthService) { }

  token: string | null = this.authService.getAuthToken();

  getUserProfileType(): string | JwtPayload{
    if (this.token !== null) {
      const profileType = this.decodedJwt.decodeToken(this.token);
      return profileType;
    } else {
      return 'Profile Type is not define';
    }
  }

  getUsername():string | JwtPayload {
    if (this.token !== null) {
      const username = this.decodedJwt.decodeToken(this.token);
      return username;
    } else {
      return 'Username is not defined'
    }
  }
}
