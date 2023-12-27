import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../service/profile/profile.service";
import {Router} from "@angular/router";
import {lastValueFrom} from "rxjs";
import {Location} from "@angular/common";
import {ErrorUtils} from "../../util/error-utils";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../util/custom-validators";
import {AccountProfileResponse, AccountProfileUpdateRequest} from "../../model/account-profile";
import {ConfirmPasswordDialogComponent} from "../confirm-password-dialog/confirm-password-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {formatDate} from "../../util/date-utils";
import {AuthService} from "../../service/auth/auth.service";
import {LoginRequest} from "../../model/login-request";
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  protected readonly ErrorUtils = ErrorUtils;
  account: AccountProfileResponse;
  formGroup: FormGroup;
  initialFormValue: any;

  constructor(private profileService: ProfileService,
              private authService: AuthService,
              private dialog: MatDialog,
              private router: Router,
              private location: Location) {
  }

  async ngOnInit(): Promise<void> {
    try {
      this.account = await lastValueFrom(this.profileService.getAccountInfo()) as AccountProfileResponse;
    } catch {
      this.router.navigate(['404']).then(() => {});
    }

    this.formGroup = new FormGroup({
      username: new FormControl(
        this.account.username,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
          CustomValidators.containOnlyLettersNumbersPeriods,
          CustomValidators.cannotBeginOrEndWithPeriods
        ]),
      password: new FormControl(
        '********',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
          CustomValidators.passwordStrength
        ]),
      firstName: new FormControl(
        this.account.firstName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
        ]),
      lastName: new FormControl(
        this.account.lastName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
        ]),
      gender: new FormControl(
        this.account.gender,
        [
          Validators.required
        ]),
      dateOfBirth: new FormControl(
        this.account.dateOfBirth,
        [
          Validators.required,
          CustomValidators.ageLimitation
        ]),
      email: new FormControl(
        this.account.email,
        [
          Validators.required,
          Validators.email
        ]),
      phoneNumber: new FormControl(
        this.account.phoneNumber,
        [
          Validators.required
        ]),
    });

    this.initialFormValue = this.formGroup.value;
    this.formGroup.disable();
  }

  isFormChanged(): boolean {
    return JSON.stringify(this.initialFormValue) !== JSON.stringify(this.formGroup.value);
  }

  private fillForm(): void {
    this.formGroup.setValue({
      'username': this.account.username,
      'password': '********',
      'firstName': this.account.firstName,
      'lastName': this.account.lastName,
      'gender': this.account.gender,
      'dateOfBirth': this.account.dateOfBirth,
      'email': this.account.email,
      'phoneNumber': this.account.phoneNumber
    });
  }

  edit(enable: boolean): void {
    if (enable) {
      this.formGroup.enable()
      this.formGroup.controls['password'].setErrors(null);
    } else {
      this.formGroup.disable();
      this.fillForm();
    }
  }

  async update(dialogErrors: Map<string, Map<string, string>>, value: string): Promise<void> {
    if (this.formGroup.valid) {
      let updatedAccount: AccountProfileUpdateRequest = this.formGroup.value;
      updatedAccount.dateOfBirth = formatDate(new Date(this.formGroup.value.dateOfBirth));
      if (this.formGroup.get('password').untouched || updatedAccount.password === '********') {
        updatedAccount.password = null;
      }
      const dialogRef = this.dialog.open(
        ConfirmPasswordDialogComponent,
        {
          panelClass: 'transparent-blur',
          data: {
            errors: dialogErrors,
            fieldValue: value
          }
        }
      );
      const result$ = dialogRef.afterClosed();
      updatedAccount.confirmPassword = await lastValueFrom(result$);

      if (updatedAccount.confirmPassword == null) {
        return;
      }

      const resultUpdate$ = this.profileService.update(updatedAccount);
      try {
        this.account = await lastValueFrom(resultUpdate$) as AccountProfileResponse;
        if (this.formGroup.get('password').untouched || updatedAccount.password === '********') {
          const login2$ = this.authService.login2(
            new LoginRequest(
              this.formGroup.value.username,
              this.formGroup.value.password
            )
          );

          try {
            const token: string = await lastValueFrom(login2$);
            this.authService.setToken(token);
          } catch {
            this.authService.removeToken();
            this.router.navigate(['']).then(() => {
              this.authService.openLoginDialog()
            });
          }
        }
        this.edit(false);
        this.fillForm();
      } catch (err) {
        const errors: Map<string, Map<string, string>> = new Map<string, Map<string, string>>(Object.entries(JSON.parse(JSON.stringify(err.error))));
        if (errors.has('confirmation')) {
          await this.update(errors, updatedAccount.confirmPassword);
        } else {
          ErrorUtils.setErrors(this.formGroup, errors);
        }
      }
    }
  }

  done(): void {
    if (this.location.getState()["navigationId"] !== 1) {
      this.location.back();
    } else {
      this.router.navigate(['']).then(() => {});
    }
  }
}
