import { Injectable } from '@angular/core';
import { City } from '../classes/city';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  allCities:City[]=[]
  cityCnt:number=0;
  url="http://localhost:3000/cities/";
  constructor(private http:HttpClient) {
    console.log("cities")
      this.http.get<City[]>(this.url+"all").subscribe(
        (res:City[])=> this.allCities=res,
        err=>console.log(err)
      );
   }
   getCityByName(name:string):number{
    var city = this.allCities.filter(x => x.name == name);
    if (!city || city.length == 0) {
      return null;
    }
    return city[0].id;
  }
  getCityById(id:number):City{
    this.allCities.forEach(city => {
      if(city.id==id)
        return city;
    });
    return null;
  }
  getAllCities():City[]{
    return this.allCities
6
  }
}
