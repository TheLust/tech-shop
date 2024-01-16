import {Component, OnInit} from '@angular/core';
import {MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgOptimizedImage} from "@angular/common";
import {getRandomImageUrl} from "../../utils/image-utils";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginRequest} from "../../entities/account";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-sign-in-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    NgOptimizedImage,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-in-dialog.component.html',
  styleUrl: './sign-in-dialog.component.scss'
})
export class SignInDialogComponent implements OnInit {

  image: string = '';
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<SignInDialogComponent>,
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
    })
  }

  ngOnInit(): void {
    this.image = getRandomImageUrl('assets/images/astro-images/icon', 'jpg', 5);
  }

  signIn(): void {
    if (this.form.valid) {
      this.authService.fetchTokenLogin(new LoginRequest(this.form.value))
        .subscribe({
        next: (value: string) => this.dialogRef.close(value)
        });
    }
  }
}
