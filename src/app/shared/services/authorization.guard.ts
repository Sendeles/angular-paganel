import {Inject, inject, Injectable, PLATFORM_ID} from "@angular/core";
import {AuthorizationServices} from "./authorization.services";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthorizationServices,
    private router: Router
  ) {
  }

  //Если пользователь аутентифицирован, метод возвращает true, что позволяет продолжить навигацию к запрашиваемому маршруту, если нет очищает данные аутентификации и сессии пользователя.
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (isPlatformBrowser(this.platformId)) {
      const isAdmin: boolean = localStorage.getItem('isAdmin') === 'true';
      if (this.authService.isAuthenticated()) {
        if (isAdmin) {
          return true; // Разрешаем доступ к /admin для администратора
        } else {
          // Устанавливаем задержку перед перенаправлением
          this.router.navigate(['/404'], {queryParams: {notAdmin: true}});
          return false;
        }
      } else {
        // Устанавливаем задержку перед перенаправлением
        this.router.navigate(['/404'], {queryParams: {needToLogin: true}});
        return false;
      }
    }
    return false; // Возвращаем false, если не в браузерной среде
  }
}

export function AuthGuardFunc(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  const guard: AuthGuard = inject(AuthGuard);
  return guard.canActivate(route, state);
}
