import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from '../config/axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  login(
    email: string,
    password: string,
    successCallback: Function,
    errorCallback: Function
  ): void {
    axios
      .post('user/login', { email, password })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data?.user));
        localStorage.setItem('jwToken', response.data?.token);
        successCallback();
        this.router.navigate(['/']);
      })
      .catch((err) => {
        errorCallback(err?.response?.data);
      });
  }

  register(
    name: string,
    email: string,
    password: string,
    age: string,
    successCallback: Function,
    errorCallback: Function
  ): void {
    axios
      .post('user/register', { name, email, password, age: parseInt(age) })
      .then((response) => {
        this.router.navigate(['/login']);
        successCallback();
      })
      .catch((err) => {
        errorCallback(err?.response?.data);
      });
  }

  updateAccount(
    name: string,
    age: string,
    successCallback: Function,
    errorCallback: Function
  ): void {
    axios
      .put('user/me', { name, age: parseInt(age) })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data?.data));
        successCallback(response.data?.data);
      })
      .catch((err) => {
        errorCallback();
      });
  }

  getAvatar(callback: Function) {
    const user = this.getUser();
    axios
      .get(`user/${user?._id}/avatar`)
      .then((response) => {
        return new Blob([response.data]);
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        callback(url);
        localStorage.setItem('avatar', url);
        return url;
      })
      .catch((err) => {
        return null;
      });
  }

  deleteAccount(): void {
    axios
      .delete('user/me')
      .then((response) => {
        this.logout();
        this.router.navigate(['/login']);
      })
      .catch((err) => {});
  }

  logout(): any {
    localStorage.clear();
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService },
];
