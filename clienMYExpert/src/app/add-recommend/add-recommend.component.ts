import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecommendsService } from '../services/recommends.service';

@Component({
  selector: 'app-add-recommend',
  templateUrl: './add-recommend.component.html',
  styleUrls: ['./add-recommend.component.scss']
})
export class AddRecommendComponent implements OnInit {
  recommendForm: FormGroup;
  starColor:string="warn";
  starCount:number=5;
  rating:number=4;
  idprof:number;
  iduser:number;
  cont:string = 'פירוט';
  submitted:boolean = false;
  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private recommendService:RecommendsService) { 
    this.recommendForm = formBuilder.group({ 
      content: ['', Validators.required],
      title: ['', Validators.required],
      stars: [0],
      profId: [0],
      userId: [0]
    })
  }
  get content() {
    return this.recommendForm.get("content");
  }

  get title() {
    return this.recommendForm.get("title");
  }
  ngOnInit(): void {
  }
  onRatingChanged(stars:number):void{
  this.rating=stars
  }
  initSubmitted(){
    this.submitted = false;
  }
  save_recommend(){
    this.submitted = true;
    if (this.title.hasError('required') || this.content.hasError('required'))
    return;
    this.iduser = JSON.parse(localStorage.getItem("user")).id;
    console.log(this.iduser);
    this.activatedRoute.paramMap.subscribe(res => this.idprof =  Number(res.get("id")));
    this.recommendForm.patchValue({stars:this.rating, userId:this.iduser, profId: this.idprof });
    // alert(this.iduser + " " + this.idprof); --works correctly
    this.recommendService.saveRecommend(this.recommendForm.value).subscribe(res=> console.log(res));
  }
  getMessage():string{
    if (this.title.hasError('required') || this.content.hasError('required'))
        return 'לא ניתן לשלוח המלצה ריקה';
    return 'ההמלצה נשלחה בהצלחה, וממתינה לאישור מערכת';
  }
}
