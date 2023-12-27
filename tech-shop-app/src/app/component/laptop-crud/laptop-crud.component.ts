import {Component} from '@angular/core';
import {Laptop, ProductCardResponse} from "../../model/product";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ProductService} from "../../service/product/product.service";

@Component({
  selector: 'app-laptop-crud',
  templateUrl: './laptop-crud.component.html',
  styleUrls: ['./laptop-crud.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class LaptopCrudComponent {

  constructor(private productService: ProductService) {}

  columnsToDisplay: string[] = ['name', 'category', 'price', 'discount'];
  columnsToDisplayWithExpand: string[] = [...this.columnsToDisplay, 'expand'];
  expandedElement: ProductCardResponse | null;
  dataSource: Laptop[] = this.productService.getLaptops();
}
