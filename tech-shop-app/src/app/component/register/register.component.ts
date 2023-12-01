import {Component, OnInit} from '@angular/core';
import {ErrorUtils} from "../../util/error-utils";
import {AuthService} from "../../service/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../util/custom-validators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  protected readonly ErrorUtils = ErrorUtils;
  formGroup: FormGroup;
  genders: string[] = ["Male", "Female", "Other"];

  constructor(private authService: AuthService, public router: Router) {
      authService.removeToken();
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
          CustomValidators.containOnlyLettersNumbersPeriods,
          CustomValidators.cannotBeginOrEndWithPeriods
        ]),
      password: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
          CustomValidators.passwordStrength
        ]),
      confirmPassword: new FormControl(
        '',
        [
          Validators.required,
          CustomValidators.matchPassword
        ]),
      firstName: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
        ]),
      lastName: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
        ]),
      gender: new FormControl(
        'MALE',
        [
          Validators.required
        ]),
      dateOfBirth: new FormControl(
        '',
        [
          Validators.required,
          CustomValidators.ageLimitation
        ]),
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.email
        ]),
      phoneNumber: new FormControl(
        '',
        [
          Validators.required
        ]),
    });

    this.formGroup.get('password').valueChanges.subscribe(() => {
      this.formGroup.get('confirmPassword').updateValueAndValidity();
    });
  }

  register(): void {
    if (this.formGroup.valid) {
      this.authService.register(this.formGroup)
        .subscribe({
          next: value => alert(value),
          error: err => ErrorUtils.setErrors(
            this.formGroup,
            new Map<string, Map<string, string>>(Object.entries(JSON.parse(err.error)))
          )
        });
    }
  }
}
