import {Injectable} from '@angular/core';
import {Product} from "../../model/product";
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../../../environments/environment";
import {lastValueFrom, map, Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private router: Router) { }

  public async getProducts(category: string): Promise<Product[]> {
    let url: string = `${baseUrl}/products`;
    url += category !== null ? ('?category=' + category) : '';
    const products$: Observable<Product[]> = this.http.get<Product[]>(url);
    try {
      return await lastValueFrom(products$.pipe(
        map((products: Product[]) => products.map(productJson => Object.assign(new Product(), productJson)))
      ));
    } catch(err) {
      this.router.navigate(['404']).then(() => {alert("Failed to fetch data from back! Please report to us!")});
    }
    return null;
  }
}
