import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecommendsService } from '../services/recommends.service';
import { Recommend } from '../classes/recommend';

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
  msg:string = '';
 //2 is for okay, 1 is not okay because a recommend had been added, and 2 is not okay because a meeting never had accoured.
  canRecommend:any = 10;
  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private recommendService:RecommendsService) { 
    this.recommendForm = formBuilder.group({ 
      content: [''],
      title: [''],
      stars: [''],
      profId: [''],
      userId: ['']
    });
    let user:any = JSON.parse(localStorage.getItem("user"));
    this.activatedRoute.paramMap.subscribe((res) => {this.idprof =  Number(res.get("id"));
    this.recommendService.checkValidation(user, this.idprof).subscribe((res)=> {console.log(res); this.canRecommend = res });
  });

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
    let user:any = JSON.parse(localStorage.getItem("user"));

    this.submitted = true;
    if (this.title.hasError('required') || this.content.hasError('required')){
          this.msg = 'לא ניתן לשלוח המלצה ריקה';
          return;
    }
    if (this.content.value.length>500)
          {
            this.msg = 'לא ניתן לשלוח מעל 500 תווים בתוכן';
            return;
          }
    if (!user)
        {   
          this.msg = 'עליך להרשם כדי להוסיף המלצות';
          return;
        }
    this.iduser =  JSON.parse(localStorage.getItem("user")).id;
    this.activatedRoute.paramMap.subscribe(res => this.idprof =  Number(res.get("id")));
    this.recommendService.getRecommend.emit(new Recommend(this.idprof,this.iduser,this.title.value,this.content.value,this.rating))
    this.recommendForm.patchValue({stars:this.rating, userId:this.iduser, profId: this.idprof });
    alert(this.iduser + " " + this.idprof); 
    this.msg = 'ההמלצה נשלחה בהצלחה, וממתינה לאישור מערכת';
    this.recommendService.saveRecommend(this.recommendForm.value).subscribe( (res) => {console.log(res); if(res==null) this.msg="לא ניתן להמליץ פעמיים";});

  }

}
