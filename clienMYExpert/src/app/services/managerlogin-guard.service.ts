import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Expert } from '../classes/expert';

@Injectable({
  providedIn: 'root'
})
export class ManagerloginGuardService {
  public constructor(private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      let user = localStorage.getItem("manager");
      if (user === null) {
          this.router.navigate(["/about"]);
          return false;
      }
      return true;

}
}
