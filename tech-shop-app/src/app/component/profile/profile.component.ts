import {Component, OnInit} from '@angular/core';
import {AccountProfileResponse} from "../../model/account-profile-response";
import {ProfileService} from "../../service/profile/profile.service";
import {Router} from "@angular/router";
import {lastValueFrom} from "rxjs";
import {Location} from "@angular/common";
import {ErrorUtils} from "../../util/error-utils";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../util/custom-validators";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  account: AccountProfileResponse;
  formGroup: FormGroup;

  constructor(private profileService: ProfileService,
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

    this.formGroup.disable();
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

  done(): void {
    if (this.location.getState()["navigationId"] !== 1) {
      this.location.back();
    } else {
      this.router.navigate(['']).then(() => {});
    }
  }

  protected readonly ErrorUtils = ErrorUtils;
}
