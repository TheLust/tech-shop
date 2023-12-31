import {Component, HostListener, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  mobile: boolean;
  username: string;

  navRoutes: Map<string, string> = new Map<string, string>([
    ['Home', ''],
    ['About', 'about']
  ]);

  constructor(public dialog: MatDialog, public router: Router, public authService: AuthService) {
    this.username = authService.getUsernameFromToken(authService.getToken());
  }

  ngOnInit(): void {
    this.mobile = window.innerWidth < 767;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.mobile = window.innerWidth < 767;
  }

  getRoutes(): string[] {
    return Array.from(this.navRoutes.keys());
  }

  navigate(url: string): void {
    this.router.navigate([url]).then(() => {});
  }
}
