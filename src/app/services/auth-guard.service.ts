import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenStorageService } from './tokenstorage.service';


@Injectable()
export class AuthGuardService implements CanActivate {
   
    constructor(private router:Router,private token: TokenStorageService) {
       
    }
    
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean|UrlTree {
      
      const user = window.localStorage.getItem('auth-user');    
      if(user === null) {
       this.router.navigate(["login"],{ queryParams: { retUrl: route.url} });
       return false;
   }
   
   
   return true;
}

}