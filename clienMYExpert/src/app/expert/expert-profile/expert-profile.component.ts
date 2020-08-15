import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Expert } from 'src/app/classes/expert';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CompileTypeSummary } from '@angular/compiler';
import { CitiesService } from 'src/app/services/cities.service';
import { City } from 'src/app/classes/city';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ExpertsService } from 'src/app/services/experts.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-expert-profile',
  templateUrl: './expert-profile.component.html',
  styleUrls: ['./expert-profile.component.scss']
})
export class ExpertProfileComponent implements OnInit {
  expert: Expert;
  allCities: City[];
  editedExpert: Expert = new Expert();
  filteredCities: Observable<string[]>;
  citySelect = new FormControl();
  @ViewChild('FileSelectInputDialog') FileSelectInputDialog: ElementRef;
  detailsForm: FormGroup;
  constructor(private userService:UsersService,private formBuilder: FormBuilder, private cityService: CitiesService, private expertService: ExpertsService, private experts: ExpertsService, private activatedRoute: ActivatedRoute) {
    this.cityService.getAllCities().subscribe((res: City[]) => {
      this.allCities = res;
    });
    this.activatedRoute.paramMap.subscribe(res => {
      this.experts.getById(Number(res.get("id"))).subscribe((res: Expert) => {
        this.expert = res[0];
        console.log(this.expert);
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
      }, err => console.log(err));






    }, err => console.log(err))
  }

  ngOnInit(): void {



  }
  saveDetails(): void {
    console.log(this.detailsForm.get("imgUrl"))
    this.editedExpert.userName = this.detailsForm.get("name").value;
    this.editedExpert.userPassword = this.detailsForm.get("password").value;
    this.editedExpert.description = this.detailsForm.get("description").value;
    this.editedExpert.businessName = this.detailsForm.get("businessName").value;
    this.editedExpert.id = this.expert.id;
    this.editedExpert.city = this.cityService.getCityByName(this.detailsForm.get("city").value);
    this.editedExpert.imgUrl=this.selectedFile.name;
    this.expertService.insertImg(this.fd).subscribe(res => {
      this.expertService.putExpert(this.editedExpert).subscribe(res=>{
        // this.userService.getLoggedInName.emit(new User(this.editedExpert.id,edi);
      },err=>console.log(err))
      
    }, err => console.log(err));

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
  selectedFile: File = null;
  fd = new FormData();

  createFormData(event) {
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
    this.detailsForm.get("imgUrl").setValue( this.selectedFile.name);
  }

}
