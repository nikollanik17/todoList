import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  public account: User;
  avatarImage: SafeUrl;
  image: string;
  errorMessage: string;
  successMessage: string;
  loading: boolean = false;
  deleteModalActive: boolean = false;

  constructor(
    public authService: AuthService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.successMessage = '';
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.account = this.authService.getUser();
    // this.authService.getAvatar((blob: any) => {
    //   this.image = blob;
    //   this.avatarImage = this.sanitizer.bypassSecurityTrustUrl(this.image);
    //   console.log(this.avatarImage);
    // });
  }

  updateAccount(name: string, age: string) {
    this.loading = true;
    this.authService.updateAccount(
      name,
      age,
      (data: any) => this.successCallback(data),
      () => this.errorCallback()
    );
  }

  updateAvatar(file: string) {
    console.log(file);
  }

  private successCallback(data: any) {
    this.account = new User(data.name, data.email, data.age);
    this.errorMessage = '';
    this.successMessage = 'Account successfully updated';
    this.loading = false;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  private errorCallback() {
    this.errorMessage = 'Error updating account';
    this.successMessage = '';
    this.loading = false;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  public handleLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  handleModalOpen() {
    this.deleteModalActive = true;
  }

  handleModalClose() {
    this.deleteModalActive = false;
  }

  handleDelete() {
    this.authService.deleteAccount();
  }

  preventClose(e: Event) {
    e.stopPropagation();
  }
}
