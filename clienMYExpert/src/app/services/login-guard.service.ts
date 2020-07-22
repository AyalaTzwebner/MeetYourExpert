import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {


  public constructor(private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      let user = localStorage.getItem("user");
      if (user === null) {
          this.router.navigate(["/login"]);
          return false;
      }
      return true;

}
logOut():void{
  
}
}