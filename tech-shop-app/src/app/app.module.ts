import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from './component/register/register.component';
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {NgxMatIntlTelInputComponent} from "ngx-mat-intl-tel-input";
import {HomeComponent} from './component/home/home.component';
import {AdminComponent} from './component/admin/admin.component';
import {CookieService} from "ngx-cookie-service";
import {ForbiddenComponent} from './component/forbidden/forbidden.component';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import {MatDialogModule} from "@angular/material/dialog";
import { LoginDialogComponent } from './component/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './component/register-dialog/register-dialog.component';
import {MatStepperModule} from "@angular/material/stepper";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    ForbiddenComponent,
    NotFoundComponent,
    NavbarComponent,
    LoginDialogComponent,
    RegisterDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatIntlTelInputComponent,
    MatDialogModule,
    MatStepperModule
  ],
  providers: [
      CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
