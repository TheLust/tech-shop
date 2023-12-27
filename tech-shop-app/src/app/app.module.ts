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
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {NgxMatIntlTelInputComponent} from "ngx-mat-intl-tel-input";
import {HomeComponent} from './component/home/home.component';
import {AdminComponent} from './component/admin/admin.component';
import {CookieService} from "ngx-cookie-service";
import {ForbiddenComponent} from './component/forbidden/forbidden.component';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import {MatDialogModule} from "@angular/material/dialog";
import {LoginDialogComponent} from './component/login-dialog/login-dialog.component';
import {RegisterDialogComponent} from './component/register-dialog/register-dialog.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatMenuModule} from "@angular/material/menu";
import {ProfileComponent} from './component/profile/profile.component';
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import {ConfirmPasswordDialogComponent} from './component/confirm-password-dialog/confirm-password-dialog.component';
import {AboutComponent} from './component/about/about.component';
import {LaptopListComponent} from './component/laptop-list/laptop-list.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSliderModule} from "@angular/material/slider";
import {MatListModule} from "@angular/material/list";
import {LaptopCrudComponent} from './component/laptop-crud/laptop-crud.component';
import {MatTableModule} from "@angular/material/table";
import {APP_INITIALIZER, NgModule} from "@angular/core";
import {ProductService} from "./service/product/product.service";
import {MatPaginatorModule} from "@angular/material/paginator";

export function initializeApp(productService: ProductService) {
    return () => productService.initialize();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    ForbiddenComponent,
    NotFoundComponent,
    NavbarComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    ProfileComponent,
    ConfirmPasswordDialogComponent,
    AboutComponent,
    LaptopListComponent,
    LaptopCrudComponent
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
        MatStepperModule,
        MatMenuModule,
        MatSelectModule,
        MatOptionModule,
        MatDividerModule,
        MatExpansionModule,
        MatSliderModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule
    ],
  providers: [
    CookieService,
    ProductService,
    {
        provide: APP_INITIALIZER,
        useFactory: initializeApp,
        deps: [ProductService],
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
