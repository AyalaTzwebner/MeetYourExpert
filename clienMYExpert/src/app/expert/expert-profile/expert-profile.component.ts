import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Expert } from 'src/app/classes/expert';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CompileTypeSummary } from '@angular/compiler';
import { CitiesService } from 'src/app/services/cities.service';
import { City } from 'src/app/classes/city';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ExpertsService } from 'src/app/services/experts.service';

@Component({
  selector: 'app-expert-profile',
  templateUrl: './expert-profile.component.html',
  styleUrls: ['./expert-profile.component.scss']
})
export class ExpertProfileComponent implements OnInit {
  @Input() expert: Expert;
  allCities:City[];
  editedExpert:Expert=new Expert();
  filteredCities: Observable<string[]>;
  citySelect = new FormControl();
  @ViewChild('FileSelectInputDialog') FileSelectInputDialog: ElementRef;
  detailsForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private cityService:CitiesService,private expertService:ExpertsService) {

  }

  ngOnInit(): void {
    this.cityService.getAllCities().subscribe((res: City[]) => {
      this.allCities = res;


 this.detailsForm = this.formBuilder.group({
      name: [this.expert.userName, [Validators.required]],
      password: [this.expert.userPassword, [Validators.required]],
      city: [this.cityService.getCityById(this.expert.city).name, [Validators.required]],
      businessName: [this.expert.businessName, [Validators.required]],
      description: [this.expert.description, [Validators.required]],
      imgUrl: [this.expert.imgUrl]
    });
    this.filteredCities = this.detailsForm.get("city").valueChanges.pipe(
      startWith(''),
      map(value => this._filterCity(value.toString()))
    );
      
    }, err => console.log(err))
   
    
  }
  saveDetails(): void {
    console.log(this.detailsForm.get("imgUrl"))
    this.editedExpert.userName = this.detailsForm.get("name").value;
    this.editedExpert.userPassword = this.detailsForm.get("password").value;
    this.editedExpert.description = this.detailsForm.get("description").value;
    this.editedExpert.businessName = this.detailsForm.get("businessName").value;
    this.editedExpert.city = this.cityService.getCityByName(this.detailsForm.get("city").value)
    this.expertService.putExpert(this.editedExpert).subscribe(res=>{
    },err=>console.log(err));

  }
  public OpenAddFilesDialog() {
    const e: HTMLElement = this.FileSelectInputDialog.nativeElement;
    e.click();
  }
  private _filterCity(value: string): string[] {
    const filterValue = value.toLowerCase();
    let array: string[] = this.allCities.map(city => { return city.name })
    let filtered = array.filter(option => { return option.toLowerCase().includes(filterValue) });
    return filtered
  }
  image: File;
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.detailsForm.get("imgUrl").setValue(event.target.result);
      };
    }
  }
}
