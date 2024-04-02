import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtUtilsService {

  constructor(private authService: AuthService) { }

  token: string | null = this.authService.getAuthToken();

  decodeToken(token:string) {
    return jwtDecode(token);
  }

  checkIsExpiredToken(token:string) {
    const expired = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expired;
  }
 
}