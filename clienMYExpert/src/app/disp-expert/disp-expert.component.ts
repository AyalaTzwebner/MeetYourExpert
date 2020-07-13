import { Component, OnInit } from '@angular/core';
import { Expert } from '../classes/expert';
import { ExpertsService } from '../services/experts.service';
import { ActivatedRoute } from '@angular/router';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { group } from '@angular/animations';


@Component({
  selector: 'app-disp-expert',
  templateUrl: './disp-expert.component.html',
  styleUrls: ['./disp-expert.component.scss']
})
export class DispExpertComponent implements OnInit {
  expert: Expert;
  constructor(private experts: ExpertsService, private activatedRoute: ActivatedRoute) {
    this.expert = new Expert(20, "דוד שרוני", "davidddd", "davidsharoni@gmail.com", 38, 2, "https://cdn1.pro.co.il/prod/images/Business/ProfilePicture/115/4d5d83955a5d12e67fd2e07de94978b6.jpg", "מריו אינסטלציה", "מריו אינסטלציה עוסק במגוון תחומים על קו האינסטלציה עם שימת דגש על איכות חומרים, מחירים שפויים ויחס אישי ואדיב", 3.47)
    // this.activatedRoute.paramMap.subscribe(res => {
    //   this.experts.getById(Number(res.get("id"))).subscribe((res: Expert) => {
    //     this.expert = res[0];
    //     console.log(this.expert)
    //   },
    //     err => {
    //       console.log(err)
    //     })
    // });
  }
  fullStars(): number[] {
    let arr: number[] = [];
    let full, empty, i: number;
    full=Math.floor(this.expert.score );
    empty=Math.floor(5-this.expert.score );
    for (i = 0; i < full; i++)
      arr.push(1);
    if (full + empty < 5)
      arr.push(0.5);
    for (i = 0; i < empty; i++)
      arr.push(0)
    console.log(arr)
    return arr
  }
  ngOnInit(): void {

  }
}
