import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable, ReplaySubject} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const logged: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    this.authService.user.subscribe(user => {
      if (!user) {
        this.authService.goToLoginPage();
        logged.next(false);
        logged.complete();
      } else {
        logged.next(true);
        logged.complete();
      }
    });
    return logged;
  }
}
