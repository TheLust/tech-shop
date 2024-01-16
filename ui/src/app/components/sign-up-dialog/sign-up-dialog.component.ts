import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {KeyValuePipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../services/auth/auth.service";
import {getRandomImageUrl} from "../../utils/image-utils";
import {Gender, GenderKeyType, RegisterRequest} from "../../entities/account";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMatIntlTelInputComponent} from "ngx-mat-intl-tel-input";

@Component({
  selector: 'app-sign-up-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    MatSelectModule,
    NgForOf,
    KeyValuePipe,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatIntlTelInputComponent
  ],
  templateUrl: './sign-up-dialog.component.html',
  styleUrl: './sign-up-dialog.component.scss'
})
export class SignUpDialogComponent implements OnInit {

  image: string = '';
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<SignUpDialogComponent>,
              public authService: AuthService) {
    this.form = new FormGroup<any>({
      username: new FormControl(
        '',
        [
          Validators.required
        ]),
      password: new FormControl(
        '',
        [
          Validators.required
        ]),
      confirmPassword: new FormControl(
        '',
        [
          Validators.required
        ]),
      firstName: new FormControl(
        '',
        [
          Validators.required
        ]),
      lastName: new FormControl(
        '',
        [
          Validators.required
        ]),
      gender: new FormControl(
        '',
        [
          Validators.required
        ]),
      dateOfBirth: new FormControl(
        '',
        [
          Validators.required
        ]),
      email: new FormControl(
        '',
        [
          Validators.required
        ]),
      phoneNumber: new FormControl(
        '',
        [
          Validators.required
        ]),
    })
  }

  ngOnInit(): void {
    this.image = getRandomImageUrl('assets/images/astro-images/icon', 'jpg', 5);
  }

  signUp(): void {
    // console.log(new RegisterRequest(this.form.getRawValue()));
    if (this.form.valid) {
      this.authService.fetchTokenRegister(new RegisterRequest(this.form.value))
        .subscribe({
          next: (value: string) => this.dialogRef.close(value)
        });
    }
  }

  protected readonly Gender = Gender;
}
