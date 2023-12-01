import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseUrl} from "../../environments/environment";
import {FormGroup} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenKey: string = 'jwtToken';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getToken(): string | null {
    return this.cookieService.get(this.tokenKey);
  }

  setToken(token: string): void {
    this.cookieService.set(this.tokenKey, token);
  }

  removeToken(): void {
    this.cookieService.delete(this.tokenKey);
  }

  isNotExpired(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTimestamp;
    } catch (error) {
      return false;
    }
  }

  getRole(token: string): string {
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role.replace(/^ROLE_/, '').toLowerCase();
    } catch (error) {
      return 'guest';
    }
  }

  getRoleMap() : Map<string, number> {
    return new Map<string, number>([
        ['admin', 0],
        ['operator', 1],
        ['user', 2],
        ['guest', 3]
    ]);
  }

  login(formGroup: FormGroup): Observable<any> {
    return this.http.post(`${baseUrl}/auth/login`, formGroup.value, {responseType: 'text'});
  }

  register(formGroup: FormGroup): Observable<any> {
    return this.http.post(`${baseUrl}/auth/register`, formGroup.value, {responseType: 'text'});
  }
}
