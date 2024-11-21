import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataJwtService {
  constructor() {}

  private profile_type: string | null = null;
  private username: string | null = null;

  setProfileType(profile_type: string) {
    return localStorage.setItem('profile_type', profile_type);
  }

  setUsername(username: string) {
    return localStorage.setItem('username', username);
  }

  setUserId(id: number) {
    return localStorage.setItem('id', id.toString());
  }

  getUserId() {
    return localStorage.getItem('id');
  }

  getUserProfileType() {
    return localStorage.getItem('profile_type');
  }

  getUsername() {
    return localStorage.getItem('username');
  }
}
