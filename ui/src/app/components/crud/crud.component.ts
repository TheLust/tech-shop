import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {Category} from "../../entities/category";
import {Product} from "../../entities/product";
import {MatTableModule} from "@angular/material/table";
import {KeyValuePipe, NgForOf} from "@angular/common";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ProductService} from "../../services/product/product.service";

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [
    MatTableModule,
    KeyValuePipe,
    NgForOf,
    MatPaginatorModule
  ],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent {

  @Input('categories') categories: Category[] = [];
  @Input('products') products: Product[] = [];
  @Output() changes = new EventEmitter();

  columns: Map<string, string | null> = new Map<string, string | null>([
    ['id', null],
    ['name', null],
    ['category', 'fullCategory'],
    ['price', null],
    ['discount', 'fullDiscount'],
    ['available', null]
  ]);

  constructor(private productService: ProductService) {}

  public showProduct(product: Product, categories: Category[]): void {
    this.productService.showProduct(product, categories).then(value => {
      if (value === true) {
        this.changes.emit();
      }
    })
  }

  protected readonly Array = Array;
}
