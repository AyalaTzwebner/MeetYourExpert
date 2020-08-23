import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExpertloginGuardService {

  public constructor(private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("code", route.params.id);
    let user = localStorage.getItem("user");
    if (user === null) {
      this.router.navigate(["/login"]);
      return false;
    }
    else if (JSON.parse(user).userType != 2 || JSON.parse(user).id != route.params.id) {
      alert(JSON.parse(user).userType);
      this.router.navigate(["/experts"]);
      return false;
    }
    else
      return true;

  }
}
