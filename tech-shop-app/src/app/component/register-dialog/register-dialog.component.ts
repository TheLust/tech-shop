import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorUtils} from "../../util/error-utils";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {CustomValidators} from "../../util/custom-validators";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {MatStep, MatStepper} from "@angular/material/stepper";
import {MatFormField} from "@angular/material/form-field";

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit{

  protected readonly ErrorUtils = ErrorUtils;
  formGroup: FormGroup;
  genders: string[] = ["Male", "Female", "Other"];
  randomImages: string[] = [
    'login-profile-icon.jpg',
    'login-profile-icon2.jpg',
    'login-profile-icon3.jpg',
    'login-profile-icon4.jpg',
    'login-profile-icon5.jpg'
  ];
  randomImageSrc: string = '';

  constructor(private authService: AuthService, private router: Router, private renderer: Renderer2) {
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

    this.getRandomImage();
  }

  getRandomImage(): void {
    const randomIndex = Math.floor(Math.random() * this.randomImages.length);
    this.randomImageSrc = `assets/images/login-dialog-profile-icons/${this.randomImages[randomIndex]}`;
  }

  @ViewChild('stepper') stepper: MatStepper;

  selectionChange(event: StepperSelectionEvent) {
    if (event.selectedIndex !== undefined) {
      this.focusField(event.selectedIndex);
    }
  }

  private focusField(index: number): void {
    const step:MatStep = this.stepper.steps.get(index);
    console.log(step)
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
