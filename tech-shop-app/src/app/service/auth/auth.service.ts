import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseUrl} from "../../../environments/environment";
import {FormGroup} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {jwtDecode} from "jwt-decode";
import {LoginRequest} from "../../model/login-request";
import {LoginDialogComponent} from "../../component/login-dialog/login-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {RegisterDialogComponent} from "../../component/register-dialog/register-dialog.component";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenKey: string = 'jwtToken';

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private dialog: MatDialog,
              private router: Router) {}

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

  getUsernameFromToken(token: string): string | null {
    if (token) {
      const decodedToken: { [key: string]: any } = jwtDecode(token);
      return decodedToken['username'];
    }

    return null;
  }

  getBearer(): string {
    return 'Bearer ' + this.getToken();
  }

  login(formGroup: FormGroup): Observable<any> {
    return this.http.post(`${baseUrl}/auth/login`, formGroup.value, {responseType: 'text'});
  }

  login2(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(`${baseUrl}/auth/login`, loginRequest, {responseType: 'text'});
  }

  register(formGroup: FormGroup): Observable<any> {
    return this.http.post(`${baseUrl}/auth/register`, formGroup.value, {responseType: 'text'});
  }

  openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, { panelClass: 'transparent-blur' });
  }

  openRegisterDialog(): void {
    this.dialog.open(RegisterDialogComponent, { panelClass: 'transparent-blur' });
  }

  signOut(): void {
    this.removeToken();
    this.router.navigate(['']).then(() => {});
  }
}
