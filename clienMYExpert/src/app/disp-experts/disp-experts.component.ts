import { Component, OnInit } from '@angular/core';
import { Expert } from '../classes/expert';
import { User } from '../classes/user';
import { ExpertsService } from '../services/experts.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-disp-experts',
  templateUrl: './disp-experts.component.html',
  styleUrls: ['./disp-experts.component.scss']
})
export class DispExpertsComponent implements OnInit {
  allExperts:Expert[]=[]
  person:Expert;
  justUser:User
  constructor(private experts:ExpertsService,private users:UsersService) {
    this.allExperts=experts.getAllExperts();
     }
  ngOnInit(): void {

  }
  showName(e:Expert):string{
    if(e.id!=null)
    return e.id.userName;
return "no name";
  }

}
