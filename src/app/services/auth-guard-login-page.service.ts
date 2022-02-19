import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenStorageService } from './tokenstorage.service';


@Injectable()
export class AuthGuardLoginService implements CanActivate {
   
    constructor(private router:Router) {
       
    }
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean|UrlTree {
      
      const user = window.localStorage.getItem('auth-user');
      
      if(user) {
       this.router.navigate(["home"], { queryParams: { retUrl: route.url} });
       return false;
   }
      
            return true;
        }
    }
