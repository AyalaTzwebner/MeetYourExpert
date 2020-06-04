import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DispExpertsComponent } from './disp-experts/disp-experts.component';
import { DispExpertComponent } from './disp-expert/disp-expert.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [{
  path:"",
  component:AboutComponent
},{
  path:"login",
  component:LoginComponent
},{
  path:"about",
  component:AboutComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
