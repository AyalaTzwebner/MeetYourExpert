import { Component, OnInit } from '@angular/core';
import { Expert } from '../classes/expert';
import { ExpertsService } from '../services/experts.service';

@Component({
  selector: 'app-disp-expert',
  templateUrl: './disp-expert.component.html',
  styleUrls: ['./disp-expert.component.scss']
})
export class DispExpertComponent implements OnInit {
  expert:Expert;
  constructor(private experts:ExpertsService) {
    this.expert=experts.getAllExperts()[0];
   }

  ngOnInit(): void {
  }

}
