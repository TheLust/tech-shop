import { Component } from '@angular/core';
import {ProductCardResponse} from "../../model/product";

@Component({
  selector: 'app-laptop-list',
  templateUrl: './laptop-list.component.html',
  styleUrls: ['./laptop-list.component.scss']
})
export class LaptopListComponent {
  sort: string = 'new';

  // product: ProductCardResponse = new ProductCardResponse(
  //   1,
  //   "Laptop",
  //   1000,
  //   "AMOUNT",
  //   100,
  //   "nush",
  //
  // );

  list: ProductCardResponse[] = [
    // this.product
  ];
}
