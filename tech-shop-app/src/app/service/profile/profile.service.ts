import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {baseUrl} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAccountInfo() {
      return this.http.get(`${baseUrl}/profile`, {responseType: 'json', headers: { 'Authorization': this.authService.getBearer() }});
  }

}
