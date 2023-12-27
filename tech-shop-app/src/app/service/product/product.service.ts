import {Injectable} from '@angular/core';
import {Laptop} from "../../model/product";
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../../../environments/environment";
import {lastValueFrom, Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private laptops: Laptop[];

  constructor(private http: HttpClient, private router: Router) { }

  async initialize(): Promise<void> {
    const laptops$: Observable<any> = this.http.get(`${baseUrl}/products?category=Laptops`);
    try {
        this.laptops = await lastValueFrom(laptops$) as Laptop[];
    } catch {
      this.router.navigate(['404']).then(() => {alert("Failed to fetch data from back! Please report to us!")});
    }
  }

  public getLaptops(): Laptop[] {
    return this.laptops;
  }
}
