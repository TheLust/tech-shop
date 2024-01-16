import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../entities/product";
import {Category} from "../../entities/category";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {KeyValue, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDragPreview,
  CdkDropList,
  moveItemInArray
} from "@angular/cdk/drag-drop";
import Swal from "sweetalert2";
import {InputKeyValue, SomethingWentWrong} from "../../utils/pop-up-utils";
import {ProductService} from "../../services/product/product.service";

export interface DialogData {
  product: Product;
  categories: Category[];
}

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogContent,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    KeyValuePipe,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    NgForOf,
    FlexLayoutModule,
    FlexLayoutModule,
    FlexModule,
    NgIf,
    CdkDragPreview
  ],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss'
})
export class ProductDialogComponent implements OnInit {

  @Output() changes: EventEmitter<boolean> = new EventEmitter();

  formGroup: FormGroup;
  maps: string[] = ['general', 'display', 'processor', 'memory', 'gpu', 'functionality', 'connectivity'];

  constructor(private dialog: MatDialog,
              private dialogRef: MatDialogRef<ProductDialogComponent>,
              private productService: ProductService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    data.product = new Product(data.product);

    this.formGroup = new FormGroup({
      id: new FormControl(
        this?.data?.product?.id,
        [
          Validators.required
        ]),
      name: new FormControl(
        this?.data?.product?.name,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(255)
        ]),
      parent: new FormControl(
        this?.data?.product?.category?.parent?.id,
        [
          Validators.required
        ]),
      category: new FormControl(
        this?.data?.product?.category?.id,
        [
          Validators.required
        ]),
      price: new FormControl(
        this?.data?.product?.price,
        [
          Validators.required,
          Validators.min(0)
        ]),
      discount: new FormControl(
        this?.data?.product?.discount,
        [
          Validators.required
        ]),
      discountType: new FormControl(
        this?.data?.product?.discountType,
        [
          Validators.required
        ]),
      available: new FormControl(
        this?.data?.product?.available,
        [
          Validators.required
        ])
    });
  }

  ngOnInit(): void {
    this.formGroup.get('id')?.disable();

    if (!this.data?.product.id) {
      this.formGroup.removeControl('id');
    }
  }

  public getProperty(object: any, field: string): any {
    return object[field as keyof typeof object];
  }

  public getSubCategories(id: number): Category[] | undefined {
    return this.data.categories.find((category: Category) => category.id == id)?.subCategories;
  }
  public addMapElement(target: string): void {
    InputKeyValue(this.dialog).then(value => {
      if (value) {
        const targetKey = target as keyof Product;
        const targetValue = this.data.product[targetKey];

        if (targetValue instanceof Map) {
          targetValue.set(value.key, value.value);
        }

        Swal.fire({
          title: "Added!",
          text: "Element has been added.",
          icon: "success"
        }).then(() => {});
      }
    });
  }

  public editMapElement(target: string, element: KeyValue<any, any>): void {
    InputKeyValue(this.dialog, element).then(value => {
      if (value) {
        const targetKey = target as keyof Product;
        const targetValue = this.data.product[targetKey];

        if (targetValue instanceof Map) {
          targetValue.set(value.key, value.value);
        }

        Swal.fire({
          title: "Updated!",
          text: "Element has been updated.",
          icon: "success"
        }).then(() => {});
      }
    });
  }

  public deleteMapElement(target: string, element: KeyValue<any, any>): void {
    const targetKey = target as keyof Product;
    const targetValue = this.data.product[targetKey];

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this element?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        if (!(targetValue instanceof Map)) {
          SomethingWentWrong();
          throw new Error("Product images are undefined.");
        }

        targetValue.delete(element.key);

        Swal.fire({
          title: "Deleted!",
          text: "Image has been deleted.",
          icon: "success"
        }).then(() => {});
      }
    });
  }

  public cancel(): void {
      this.dialogRef.close(false);
  }

  private generateRandomFileName(): string {
      const randomString = Math.random().toString(36).substring(7);
      return `image_${randomString}.png`;
  }

  private base64ToFile(base64String: string): File {
      const arr: string[] = base64String.split(',');
      const mimeType: string = arr[0].match(/:(.*?);/)![1];
      const bstr: string = atob(arr[1]);
      let n: number = bstr.length;
      const uint8Array: Uint8Array = new Uint8Array(n);

      while (n--) {
          uint8Array[n] = bstr.charCodeAt(n);
      }

      const fileName = this.generateRandomFileName();
      const blob: Blob = new Blob([uint8Array], { type: mimeType });
      return new File([blob], fileName, { type: mimeType });
  }

  private getImages(): File[] {
    if (this?.data?.product?.images === undefined) {
        throw new Error('Product is not initialized.');
    }

    return this?.data?.product.images.map((image: string) => this.base64ToFile('data:image/png;base64,' + image));
  }

  public save(): void {
    if (this.formGroup.valid) {
        if (this.data?.product.id) {
            this.data.product = {...this.data.product, ...this.formGroup.value};
            this.productService.updateProduct(this.data.product, this.getImages())
              .then(() => {
                  Swal.fire('Success', 'The product was updated successfully!', 'success').then(() => {
                      this.dialogRef.close(true);
                  });
                },
                () => {
                  SomethingWentWrong();
                });
        } else {
            this.data.product = {...this.data.product, ...this.formGroup.value};
            this.productService.saveProduct(this.data.product, this.getImages())
              .then(() => {
                  Swal.fire('Success', 'The product was added successfully!', 'success').then(() => {
                      this.dialogRef.close(true);
                  });
                },
                () => {
                  SomethingWentWrong();
                });
        }
    }
  }
  drop(event: CdkDragDrop<string[]>): void {
    if (this?.data?.product?.images === undefined) {
      throw new Error('Product is not initialized.');
    }

    moveItemInArray(this.data.product.images, event.previousIndex, event.currentIndex);
  }

  deleteImage(index: number): void {

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this image?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
          if (this?.data?.product?.images === undefined) {
            SomethingWentWrong();
            throw new Error("Product images are undefined.");
          }

          this?.data?.product.images.splice(index, 1);

          Swal.fire({
            title: "Deleted!",
            text: "Image has been deleted.",
            icon: "success"
          }).then(() => {});
        }
    });
  }

  uploadFile($event: any): void {
    for (let i: number = 0; i < $event.target.files.length; i++) {
      const reader: FileReader = new FileReader();
      let pattern: RegExp = /data:image[^;]+;base64,/g;
      reader.onload = () => {
        const base64String: string = (reader.result as string).replace(pattern, '')
        if (this?.data?.product?.images === undefined) {
          throw new Error('Product is not initialized.');
        }
        this?.data?.product.images.push(base64String);
      }
      reader.readAsDataURL($event.target.files[i]);
    }
  }
}
