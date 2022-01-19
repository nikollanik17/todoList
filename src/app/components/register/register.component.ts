import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  message: String;

  constructor(public authService: AuthService, private router: Router) {
    this.message = '';
  }

  ngOnInit(): void {}

  register(
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    age: string
  ) {
    if (password !== confirmPassword) {
      this.message = 'Passwords must match';
      return;
    }
    this.authService.register(
      name,
      email,
      password,
      age,
      () => (this.message = ''),
      (err: any) => (this.message = err)
    );
  }
}
