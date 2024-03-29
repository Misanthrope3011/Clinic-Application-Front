import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';


@Injectable()
export class DoctorRoleAuth implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | UrlTree {

    if (window.localStorage.getItem('auth-user') === null) {
      this.router.navigate(["home"], {queryParams: {retUrl: route.url}});
      return false;
    } else {
      var obj = JSON.parse(window.localStorage.getItem('auth-user'));
      if (obj.body.roles[0] != "ROLE_DOCTOR") {
        this.router.navigate(["home"], {queryParams: {retUrl: route.url}});
        return false;
      }
    }


    return true;
  }

}
