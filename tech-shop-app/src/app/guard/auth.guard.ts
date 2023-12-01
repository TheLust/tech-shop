import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../service/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const token: string = authService.getToken();

  if (!authService.isNotExpired(token)) {
    router.navigate(["/login"]);
    return false;
  }

  if (route.data?.['requiredRole'] != null) {
    console.log(authService.getRoleMap().get(authService.getRole(token)));
    console.log(authService.getRoleMap().get(route.data?.['requiredRole']));
    if (authService.getRoleMap().get(authService.getRole(token)) > authService.getRoleMap().get(route.data?.['requiredRole'])) {
      router.navigate(["/403"]);
      return false;
    }
  }

  return true;
};
