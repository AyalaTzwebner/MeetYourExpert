import { Component, OnInit } from '@angular/core';
import { Expert } from 'src/app/classes/expert';
import { ActivatedRoute } from '@angular/router';
import { ExpertsService } from 'src/app/services/experts.service';

@Component({
  selector: 'app-expert-settings',
  templateUrl: './expert-settings.component.html',
  styleUrls: ['./expert-settings.component.scss']
})
export class ExpertSettingsComponent implements OnInit {
expert:Expert
  constructor(private experts: ExpertsService, private activatedRoute: ActivatedRoute,) { 
    
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(res => {
      this.experts.getById(Number(res.get("id"))).subscribe((res: Expert) => {
        this.expert = res[0];
        console.log(this.expert)
      },
        err => {
          console.log(err)
        })
    });
    // this.expert=new Expert(1,"נחמן שימעוני","543211","nanachnachma@gmail.com",16,20,"","העסק הטוב ביותר","תבואו, תציצו, תיפגעו",3)
  }

}
