import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router,private tostr:ToastrService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {    
    return this.service.isloggedin().pipe(
      switchMap(isLoggedIn => {
        if (isLoggedIn) {
          if (route.url.length > 0) {
            let menu = route.url[0].path;
            if (menu == 'user') {
              return this.service.getrole().pipe(
                map(role => {
                  if (role == 'admin') {
                    return true;
                  } else {
                    this.router.navigate(['']);
                    this.tostr.warning('You dont have access.');
                    return false;
                  }
                })
              );
            } else {
              return of(true);
            }
          } else {
            return of(true);
          }
        } else {
          this.router.navigate(['login']);
          return of(false);
        }
      })
    );
  }
}
