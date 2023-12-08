import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RoutesRecognized} from "@angular/router";
import {filter, pairwise} from "rxjs";
import {NavigationService} from "./service/navigation/navigation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'tech-shop-app';

  constructor (private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        sessionStorage.setItem('back_page', event.url);
      }
    });
  }
}
