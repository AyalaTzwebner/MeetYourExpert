import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DispExpertsComponent } from './disp-experts/disp-experts.component';
import { DispExpertComponent } from './disp-expert/disp-expert.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { MakeMeetComponent } from './make-meet/make-meet.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpExpertComponent } from './sign-up-expert/sign-up-expert.component';
import { SignUpUserComponent } from './sign-up-user/sign-up-user.component';
import { RecommendComponent } from './recommend/recommend.component';
import { AddRecommendComponent } from './add-recommend/add-recommend.component';


const routes: Routes = [{
  path: "",
  component: AddRecommendComponent
}, {
  path: "login",
  component: LoginComponent
},  {
  path: "about",
  component: AboutComponent
}, {
  path: "signup",
  component: SignUpComponent,
  children: [{
    path: "sign-up-expert",
    component: SignUpExpertComponent,
  }, {
    path: "sign-up-user",
    component: SignUpUserComponent
  }, {
    path: "",
    component: SignUpUserComponent
  }]
}, {
  path: "experts",
  component: DispExpertsComponent,
}, {
  path: "experts/:id",
  component: DispExpertComponent
}
];
/*
{path: "add-rental", canActivate: [LoginGuardService], component: AddRentalComponent},
*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
