import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {baseUrl} from "../../../environments/environment";
import {FormGroup} from "@angular/forms";
import {AccountProfileUpdateRequest} from "../../model/account-profile";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAccountInfo() {
      return this.http.get(`${baseUrl}/profile`, {responseType: 'json', headers: { 'Authorization': this.authService.getBearer() }});
  }

  update(updatedAccount: AccountProfileUpdateRequest) {
    return this.http.put(`${baseUrl}/profile`, updatedAccount, {responseType: 'json', headers: { 'Authorization': this.authService.getBearer() }});
  }

}
