import { Component, OnInit } from '@angular/core';
import { Expert } from '../classes/expert';
import { ExpertsService } from '../services/experts.service';
import { ActivatedRoute } from '@angular/router';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { group } from '@angular/animations';
import { CitiesService } from '../services/cities.service';


@Component({
  selector: 'app-disp-expert',
  templateUrl: './disp-expert.component.html',
  styleUrls: ['./disp-expert.component.scss']
})
export class DispExpertComponent implements OnInit {
  expert: Expert;
  cityString:string;
  not_clicked:boolean = true;
  constructor(private experts: ExpertsService, private activatedRoute: ActivatedRoute,private cityService:CitiesService) {
    // this.expert = new Expert(20, "דוד שרוני", "davidddd", "davidsharoni@gmail.com",26, 2, "https://cdn1.pro.co.il/prod/images/Business/ProfilePicture/115/4d5d83955a5d12e67fd2e07de94978b6.jpg", "מריו אינסטלציה", "מריו אינסטלציה עוסק במגוון תחומים על קו האינסטלציה עם שימת דגש על איכות חומרים, מחירים שפויים ויחס אישי ואדיב", 3.74)
    this.activatedRoute.paramMap.subscribe(res => {
      this.experts.getById(Number(res.get("id"))).subscribe((res: Expert) => {
        this.expert = res[0];
        console.log(this.expert)
        this.cityString=cityService.getCityById(this.expert.city).name
      },
        err => {
          console.log(err)
        })
    });
  }
  fullStars(): number[] {
    let arr: number[] = [];
    let full, empty, i: number;
    full=Math.floor(this.expert.scores );
    empty=Math.floor(5-this.expert.scores );
    for (i = 0; i < full; i++)
      arr.push(1);
    if (full + empty < 5)
      arr.push(0.5);
    for (i = 0; i < empty; i++)
      arr.push(0)
    return arr
  }

  clicked()
  {
    this.not_clicked = !this.not_clicked;
  }

  clickedTrue(){
    this.not_clicked = true;
  }
  ngOnInit(): void {

  }
}
