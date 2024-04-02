import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataJwtService {

  constructor() { }

  private profile_type: string | null = null;
  private username: string | null = null;

  setProfileType(profile_type:string) {
    this.profile_type = profile_type;
    console.log('Profile Type:', profile_type);
    return profile_type;
  }

  setUsername(username:string) {
    this.username = username;
    console.log('Username:', username);
    return username;
  } 

  getUserProfileType() {
    return this.profile_type;
  }

  getUsername() {
    return this.username;
  }
}
