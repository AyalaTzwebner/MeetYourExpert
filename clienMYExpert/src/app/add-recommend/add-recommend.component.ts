import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-recommend',
  templateUrl: './add-recommend.component.html',
  styleUrls: ['./add-recommend.component.scss']
})
export class AddRecommendComponent implements OnInit {
  recommendForm: FormGroup;
  starColor:string="warn";
  starCount:number=5;
  rating:number=4
  constructor(private formBuilder: FormBuilder) { 
    this.recommendForm = formBuilder.group({
      details: [''],
      description: ['']
    })
  }
  get details() {
    return this.recommendForm.get("details");
  }

  get description() {
    return this.recommendForm.get("description");
  }
  ngOnInit(): void {
  }
  onRatingChanged(stars:number):void{
  this.rating=stars

}
}
