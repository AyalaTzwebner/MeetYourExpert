import { Component, OnInit } from '@angular/core';
import { ExpertsService } from '../services/experts.service';
import { Expert } from '../classes/expert';
import { User } from '../classes/user';
import { UsersService } from '../services/users.service';
import { SubjectsService } from '../services/subjects.service';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss']
})
export class RecommendComponent implements OnInit {
  id:number;
  expert:Expert;//expert form the DB
  user:User;//user from the DB
  constructor(private experts:ExpertsService) { 
   }
  ngOnInit(): void {
    
  }

}
