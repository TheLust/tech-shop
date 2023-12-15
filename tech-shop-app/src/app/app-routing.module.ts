import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {AdminComponent} from "./component/admin/admin.component";
import {AuthGuard} from "./guard/auth.guard";
import {ForbiddenComponent} from "./component/forbidden/forbidden.component";
import {NotFoundComponent} from "./component/not-found/not-found.component";
import {ProfileComponent} from "./component/profile/profile.component";
import {AboutComponent} from "./component/about/about.component";

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'about', component: AboutComponent},
  {path:'admin', component:AdminComponent, canActivate: [AuthGuard], data: {requiredRole: "admin"}},
  {path:'profile', component:ProfileComponent, canActivate: [AuthGuard], data: {requiredRole: "user"}},
  {path:'403', component:ForbiddenComponent},
  {path:'404', component:NotFoundComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
