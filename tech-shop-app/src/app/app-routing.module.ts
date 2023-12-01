import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {AdminComponent} from "./component/admin/admin.component";
import {authGuard} from "./guard/auth.guard";
import {ForbiddenComponent} from "./component/forbidden/forbidden.component";
import {NotFoundComponent} from "./component/not-found/not-found.component";

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'admin', component:AdminComponent, canActivate: [authGuard], data: {requiredRole: "admin"}},
  {path:'403', component:ForbiddenComponent},
  {path:'404', component:NotFoundComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
