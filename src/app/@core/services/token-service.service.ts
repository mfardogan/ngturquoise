import { Injectable } from '@angular/core';
import Token from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  constructor() { }

  saveOnLocalStorage(token: Token) {
    localStorage.setItem('token', token.token);
    localStorage.setItem('expireAt', token.expireAt.toString());
    localStorage.setItem('user', JSON.stringify(token.user));
  }

  getToken(): string | undefined {
    const token = localStorage.getItem('token')?.toString();
    return token;
  }

  clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('expireAt');
    localStorage.removeItem('user');
  }

  isAdmin(): boolean {
    const user = localStorage.getItem('user')?.toString();
    if (user == null || user == undefined) {
      return false;
    }

    const data = JSON.parse(user);
    return data.jobDescription == 'admin';
  }

  isDoctor(): boolean {
    const user = localStorage.getItem('user')?.toString();
    if (user == null || user == undefined) {
      return false;
    }

    const data = JSON.parse(user);
    return data.jobDescription == 'doctor';
  }

  getDoctorId(): number {
    const user = localStorage.getItem('user')?.toString();
    if (user == null || user == undefined) {
      return 0;
    }

    const data = JSON.parse(user);

    if (data.jobDescription != 'doctor') {
      return 0;
    }

    return Number(data.id);
  }

  getAdminId(): number {
    const user = localStorage.getItem('user')?.toString();
    if (user == null || user == undefined) {
      return 0;
    }

    const data = JSON.parse(user);

    if (data.jobDescription != 'admin') {
      return 0;
    }

    return Number(data.id);
  }
}
