import {Component, OnInit} from '@angular/core';
import {ErrorUtils} from "../../util/error-utils";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

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

  constructor(private authService: AuthService,
              public router: Router) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.getRandomImage();
  }

  getRandomImage() {
    const randomIndex = Math.floor(Math.random() * this.randomImages.length);
    this.randomImageSrc = `assets/images/login-dialog-profile-icons/${this.randomImages[randomIndex]}`;
  }

  login(): void {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup)
        .subscribe({
          next: value => {
            this.authService.setToken(value);
            this.router.navigate([""]);
          },
          error: err => ErrorUtils.setErrors(
            this.formGroup,
            new Map<string, Map<string, string>>(Object.entries(JSON.parse(err.error)))
          )
        });
    }
  }
}
