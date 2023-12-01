import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {RegisterDialogComponent} from "../register-dialog/register-dialog.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  menu: boolean = false;

  navRoutes: Map<string, string> = new Map<string, string>([
    ['Home', ''],
    ['About', 'about'],
    ['Contact Us', 'contact']
    // ['Login', 'login'],
    // ['Register', 'register']
  ]);

  constructor(public dialog: MatDialog, private router: Router) {
  }

  getRoutes(): string[] {
    return Array.from(this.navRoutes.keys());
  }

  navigate(url: string): void {
    this.menu = false;
    this.router.navigate([url]);
  }

  openLoginDialog(): void {
    this.menu = false;
    this.dialog.open(LoginDialogComponent, { panelClass: 'dialog-transparent-background' });
  }

  openRegisterDialog(): void {
    this.menu = false;
    this.dialog.open(RegisterDialogComponent, { panelClass: 'dialog-transparent-background' });
  }
}
