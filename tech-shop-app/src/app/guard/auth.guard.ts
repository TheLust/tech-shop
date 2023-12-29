import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../service/auth/auth.service";

export const AuthGuard: CanActivateFn = (route) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const token: string = authService.getToken();

  if (!authService.isNotExpired(token)) {
    router.navigate(
        [sessionStorage.getItem('back_page') != null ? sessionStorage.getItem('back_page') : '/' ]
    ).then(() => {
      authService.openLoginDialog()
      sessionStorage.setItem('next_page', '/' + route.url.toString());
    })
    return false;
  }

  if (route.data?.['requiredRole'] != null) {
    if (authService.getRoleMap().get(authService.getRole(token)) > authService.getRoleMap().get(route.data?.['requiredRole'])) {
      router.navigate(["/403"]).then(() => {});
      return false;
    }
  }

  return true;
};
