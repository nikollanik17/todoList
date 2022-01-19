import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  message: String;

  constructor(public authService: AuthService, private router: Router) {
    this.message = '';
  }

  ngOnInit(): void {}

  login(email: string, password: string) {
    this.authService.login(
      email,
      password,
      () => (this.message = ''),
      (err: any) => (this.message = err)
    );
  }
}
