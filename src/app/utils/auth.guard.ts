import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthUsersService } from '../services/auth-users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authS: AuthUsersService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree | any{
      return this.authS.decodeToken().subscribe((data:any)=>{
        if (data.rol === 'Administrador'){
          this.router.navigateByUrl('/admin')
          return true
        }else if(data.rol === 'Docente'){
          this.router.navigateByUrl('/docente')
          return true
        }else{
          return false
        }   

      })
  }
}
