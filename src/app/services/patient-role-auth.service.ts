import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenStorageService } from './tokenstorage.service';


@Injectable()
export class PatientRoleAuth implements CanActivate {
 
  constructor(private router:Router,private token: TokenStorageService) {
   
  }
  
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean|UrlTree {
    
    if(!window.localStorage.getItem('auth-user')) {
      this.router.navigate(["home"],{ queryParams: { retUrl: route.url} });
      return false;
    } else {
      var obj = JSON.parse(window.localStorage.getItem('auth-user'));
      if(obj.body.roles[0] != "ROLE_PATIENT") {
        this.router.navigate(["home"],{ queryParams: { retUrl: route.url} });
        return false;
      }
    }
    
    
    return true;
  }
  
}