import {inject, Injectable} from "@angular/core";
import {AuthorizationServices} from "./authorization.services";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  constructor(
    private authService: AuthorizationServices,
    private router: Router
  ) {
  }

  //Если пользователь аутентифицирован, метод возвращает true, что позволяет продолжить навигацию к запрашиваемому маршруту, если нет очищает данные аутентификации и сессии пользователя.
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.isAuthenticated()) {
        if (this.authService.isAdmin()) {
          return true; // Разрешаем доступ к /admin для администратора
        } else {
          this.router.navigate(['/404'], {
            queryParams: {
              notAdmin: true
            }
          });
        }
      } else {
        this.router.navigate(['/404'], {
          queryParams: {
            needToLogin: true
          }
        });
      }
      return false;
  }
}

export function AuthGuardFunc(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  const guard = inject(AuthGuard);
  return guard.canActivate(route, state);
}
