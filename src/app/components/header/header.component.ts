import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public account: User;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.account = this.authService.getUser();
  }

  public handleAccountClick() {
    const accDropdown = document.querySelector('.header__acc-dropdown');

    accDropdown?.classList.toggle('active');
  }

  public handleLogout() {
    this.authService.logout();
    this.handleAccountClick();
    this.router.navigate(['/login']);
  }
}
