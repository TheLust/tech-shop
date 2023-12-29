export class ProductCardResponse {
  id: number;
  name: string;
  price: number;
  discountType: string;
  discount: number;
  specs: string;
  image: any;


  constructor(id: number, name: string, price: number, discountType: string, discount: number, specs: string, image: any) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.discountType = discountType;
    this.discount = discount;
    this.specs = specs;
    this.image = image;
  }
}

export class Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  discountType: string;
  discount: number;
  general: Map<string, string>;
  display: Map<string, string>;
  processor: Map<string, string>;
  memory: Map<string, string>;
  gpu: Map<string, string>;
  functionality: Map<string, string>;
  get categoryName(): string {
    return this.category.name + (this.category.parent !== null ? (' ' + this.category.parent.name) : '');
  }

  get fullDiscount(): string {
    return this.discount + (this.discountType === 'PERCENT' ? '%' : '');
  }
}

export class Category {
  id: number;
  parent: Category;
  name: string;
}

export class Laptop {
  id: number;
  name: string;
  category: Category;
  price: number;
  discountType: string;
  discount: number;
  general: Map<string, string>;
  display: Map<string, string>;
  processor: Map<string, string>;
  memory: Map<string, string>;
  gpu: Map<string, string>;
  functionality: Map<string, string>;
}
