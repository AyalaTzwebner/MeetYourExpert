import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExpertloginGuardService {

  public constructor(private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let user = localStorage.getItem("user");
    if (user === null) {
      this.router.navigate(["/login"]);
      return false;
    }
    else if (JSON.parse(user).userType != 2) {
      alert(JSON.parse(user).userType);
      this.router.navigate(["/experts"]);
      return false;
    }
    else
      return true;

  }
}
