import {Component, OnInit} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {Category} from "../../entities/category";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CategoryService} from "../../services/category/category.service";
import {ProductService} from "../../services/product/product.service";
import {lastValueFrom, Observable, Observer, Subscriber} from "rxjs";
import {Product} from "../../entities/product";
import {FormsModule} from "@angular/forms";
import {CrudComponent} from "../crud/crud.component";

@Component({
  selector: 'app-admin',
  standalone: true,
    imports: [
        MatToolbarModule,
        MatSelectModule,
        NgForOf,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        CrudComponent,
        NgIf
    ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

  categories: Category[] | undefined;
  products: Product[] | undefined;
  selected: number | undefined;

  constructor(private categoryService: CategoryService,
              private productService: ProductService) {}

  async ngOnInit(): Promise<void> {
    const categories$: Observable<Category[]> = this.categoryService.getCategories();
    this.categories = await lastValueFrom(categories$);
    this.categories = this.categories.map((category: Category) => Object.assign(new Category(), category));
    this.selected = this.categories[0].id;
  }

  public async onChange(): Promise<void> {
    if (this.selected) {
      const products$: Observable<Product[]> = this.productService.getProductsByCategory(this.selected);
      this.products = await lastValueFrom(products$);
      this.products = this.products.map((product: Product) => Object.assign(new Product(), product));
    }
  }

  public newProduct() {
    if (!this.categories) {
      throw new Error("Categories are not provided");
    }

    this.productService.newProduct(this.categories)
      .then(value => {
        if (value === true) {
          this.onChange().then(() => {});
        }
      })
  }
}
