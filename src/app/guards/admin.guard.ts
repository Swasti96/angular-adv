import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router,  } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
    
      console.log('Admin guard');
      if(this.userService.rol === 'ADMIN_ROL'){
        return true;
      }else{
        this.router.navigateByUrl('/dashboard');
        return false;
      }
      // return this.userService.rol === 'ADMIN_ROL' ? true : false;

  }
  
}
