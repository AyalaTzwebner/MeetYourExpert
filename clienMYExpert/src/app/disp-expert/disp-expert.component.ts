import { Component, OnInit } from '@angular/core';
import { Expert } from '../classes/expert';
import { ExpertsService } from '../services/experts.service';
import { ActivatedRoute } from '@angular/router';
import { CitiesService } from '../services/cities.service';
import {MatDialog} from '@angular/material/dialog';
import { AddMeetingComponent } from '../add-meeting/add-meeting.component';


@Component({
  selector: 'app-disp-expert',
  templateUrl: './disp-expert.component.html',
  styleUrls: ['./disp-expert.component.scss']
})
export class DispExpertComponent implements OnInit {
  expert: Expert;
  cityString:string;
  not_clicked:boolean = true;
  constructor(private experts: ExpertsService, private activatedRoute: ActivatedRoute,
    private cityService:CitiesService,public dialog: MatDialog) {
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
  openDialog(){
    const dialogRef = this.dialog.open(AddMeetingComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
}
