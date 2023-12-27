import {Component, OnDestroy, OnInit} from '@angular/core';
import {ErrorUtils} from "../../util/error-utils";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";
import {RegisterDialogComponent} from "../register-dialog/register-dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit, OnDestroy {

  protected readonly ErrorUtils = ErrorUtils;
  formGroup: FormGroup;
  randomImages: string[] = [
    'login-profile-icon.jpg',
    'login-profile-icon2.jpg',
    'login-profile-icon3.jpg',
    'login-profile-icon4.jpg',
    'login-profile-icon4.jpg'
  ];
  randomImageSrc: string = '';
  destroyNextPage: boolean = true;

  constructor(private authService: AuthService,
              private router: Router,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<LoginDialogComponent>) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.getRandomImage();
  }

  ngOnDestroy(): void {
    if (this.destroyNextPage) {
      sessionStorage.removeItem('next_page');
    }
  }

  getRandomImage(): void {
    const randomIndex = Math.floor(Math.random() * this.randomImages.length);
    this.randomImageSrc = `assets/images/login-dialog-profile-icons/${this.randomImages[randomIndex]}`;
  }

  openRegisterDialog(): void {
    this.authService.openRegisterDialog();
    this.destroyNextPage = false;
    this.dialogRef.close();
  }

  login(): void {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup)
        .subscribe({
          next: value => {
            this.authService.setToken(value);
            const toGo: string = sessionStorage.getItem('next_page');
            if (toGo != null) {
              this.router.navigate([toGo]).then(() => {
                sessionStorage.removeItem('next_page') ;
                window.location.reload();
              });
            } else {
              window.location.reload();
            }
          },
          error: err => ErrorUtils.setErrors(
            this.formGroup,
            new Map<string, Map<string, string>>(Object.entries(JSON.parse(err.error)))
          )
        });
    }
  }
}
