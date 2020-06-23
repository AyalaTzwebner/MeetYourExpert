import { Component, OnInit } from '@angular/core';
import { Expert } from '../classes/expert';
import { User } from '../classes/user';
import { ExpertsService } from '../services/experts.service';
import { UsersService } from '../services/users.service';
import { Subject } from '../classes/subject';

@Component({
  selector: 'app-disp-experts',
  templateUrl: './disp-experts.component.html',
  styleUrls: ['./disp-experts.component.scss']
})
export class DispExpertsComponent implements OnInit {

  allexperts:Expert[];

  constructor(private experts:ExpertsService,private users:UsersService) {
    // this.allexperts.push(new Expert(1,"a","1231","edfrb@fgf.fgh","bney brack",new Subject(1,"some field"),""))
    // this.allexperts.push(new Expert(1,"a","1231","edfrb@fgf.fgh","bney brack",new Subject(1,"some field"),""))
    // this.allexperts.push(new Expert(1,"a","1231","edfrb@fgf.fgh","bney brack",new Subject(1,"some field"),""))
    // this.allexperts.push(new Expert(1,"a","1231","edfrb@fgf.fgh","bney brack",new Subject(1,"some field"),""))
    this.experts.getAllExperts().subscribe(
      (res: Expert[]) => {
        this.allexperts = res;
      },
      err => console.log(err))
  }

  ngOnInit(): void {
   
  }
}
