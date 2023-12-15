import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorUtils} from "../../util/error-utils";
import {AuthService} from "../../service/auth/auth.service";
import {CustomValidators} from "../../util/custom-validators";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {MatStepper} from "@angular/material/stepper";
import {Router} from "@angular/router";
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {formatDate} from "../../util/date-utils";

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit, OnDestroy {

  @ViewChild('stepper') stepper: MatStepper;

  protected readonly ErrorUtils = ErrorUtils;
  formGroup: FormGroup;
  randomImages: string[] = [
    'login-profile-icon.jpg',
    'login-profile-icon2.jpg',
    'login-profile-icon3.jpg',
    'login-profile-icon4.jpg',
    'login-profile-icon5.jpg'
  ];
  randomImageSrc: string = '';
  destroyNextPage: boolean = true;

  constructor(private authService: AuthService,
              private router: Router,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<RegisterDialogComponent>) {
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

  ngOnDestroy(): void {
    if (this.destroyNextPage) {
      sessionStorage.removeItem('next_page');
    }
  }

  getRandomImage(): void {
    const randomIndex = Math.floor(Math.random() * this.randomImages.length);
    this.randomImageSrc = `assets/images/login-dialog-profile-icons/${this.randomImages[randomIndex]}`;
  }

  selectionChange(event: StepperSelectionEvent): void {
    if (event.selectedIndex !== undefined) {
      this.focusField(event.selectedIndex);
    }
  }

  private focusField(index: number): void {
    const field: HTMLElement = this.getStepElementByIndex(index).querySelector('mat-form-field');
    const input: HTMLInputElement = field.querySelector('input');
    setTimeout(() => {
      if (input) {
        input.focus();
      }
    }, 300);
  }

  private getStepElementByIndex(index: number): Element {
      const steps = document.getElementsByClassName('mat-horizontal-content-container');
      return steps.item(0).children[index];
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
        if (this.stepper.selectedIndex <= this.stepper.steps.length - 2) {
            const buttonElement: HTMLButtonElement = this.getStepElementByIndex(this.stepper.selectedIndex).querySelector('button[matStepperNext]');
            buttonElement.click();
        }
    }

    if (event.key === "Enter" && this.stepper.selectedIndex == this.stepper.steps.length - 1) {
        if (this.formGroup.valid) {
            this.register();
        }
    }
  }

  openLoginDialog(): void {
      this.dialog.open(LoginDialogComponent, { panelClass: 'dialog-transparent-background' });
      this.destroyNextPage = false;
      this.dialogRef.close();
  }

  register(): void {
    if (this.formGroup.valid) {
      let value = this.formGroup.value;
      value.dateOfBirth = formatDate(new Date(value.dateOfBirth));
      this.authService.register(this.formGroup)
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
