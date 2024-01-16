import { Component } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {TITLE} from "../../utils/constants";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(public authService: AuthService,
              public router: Router) {
  }

  protected readonly TITLE = TITLE;
}
