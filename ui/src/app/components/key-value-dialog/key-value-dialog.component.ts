import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {KeyValue, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-key-value-dialog',
  standalone: true,
  imports: [
    CdkDrag,
    CdkDropList,
    FlexModule,
    FormsModule,
    KeyValuePipe,
    MatButtonModule,
    MatDialogContent,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './key-value-dialog.component.html',
  styleUrl: './key-value-dialog.component.scss'
})
export class KeyValueDialogComponent {

  formGroup: FormGroup;

  constructor(private dialogRef: MatDialogRef<KeyValueDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: KeyValue<string, string>) {
    this.formGroup = new FormGroup({
      key: new FormControl(
        this?.data?.key,
        [
          Validators.required
        ]),
      value: new FormControl(
        this?.data?.value,
        [
          Validators.required
        ])
    });
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public return(): void {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value as KeyValue<string, string>);
    }
  }
}
