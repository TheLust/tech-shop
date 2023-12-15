import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ErrorUtils} from "../../util/error-utils";

@Component({
  selector: 'app-confirm-password-dialog',
  templateUrl: './confirm-password-dialog.component.html',
  styleUrls: ['./confirm-password-dialog.component.scss']
})
export class ConfirmPasswordDialogComponent implements OnInit, AfterViewInit {

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

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private cdr: ChangeDetectorRef,
              private dialogRef: MatDialogRef<ConfirmPasswordDialogComponent>) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      confirmation: new FormControl(this.data.fieldValue ? this.data.fieldValue : '', [Validators.required])
    });

    this.getRandomImage();
  }

  ngAfterViewInit(): void {
    if (this.data.errors) {
      ErrorUtils.setErrors(this.formGroup, this.data.errors);
      this.formGroup.get('confirmation').markAsTouched();
      this.cdr.detectChanges();
    }
  }

  getRandomImage(): void {
    const randomIndex = Math.floor(Math.random() * this.randomImages.length);
    this.randomImageSrc = `assets/images/login-dialog-profile-icons/${this.randomImages[randomIndex]}`;
  }

  confirmPassword(): void {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.get('confirmation').value)
    }
  }
}
