import {Component, Inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Product} from "../../model/product";
import {ProductService} from "../../service/product/product.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {formatCamelCaseToWords} from "../../util/string-utils";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CrudComponent implements OnChanges {

  protected readonly formatCamelCaseToWords = formatCamelCaseToWords;
  dataSource: Product[] = null;
  columns: Map<string, string> = new Map<string, string>([
    ['id', null],
    ['name', null],
    ['category', 'categoryName'],
    ['price', null],
    ['discount', 'fullDiscount'],
    ['available', null]
  ]);
  columnsToDisplayWithExpand: string[] = [...this.getColumns(), 'expand'];
  detailElements: string[] = ['general', 'display', 'processor', 'memory', 'gpu', 'functionality', 'connectivity'];
  expandedElement: Product | null;
  @Input('productType') target: string = null;

  constructor(private productService: ProductService) {
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this.dataSource = await this.productService.getProducts(this.target);
  }

  public getColumns(): string[] {
    return Array.from(this.columns.keys());
  }
}
