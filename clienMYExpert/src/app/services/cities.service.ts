import { Injectable } from '@angular/core';
import { City } from '../classes/city';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  allCities:City[]=[]
  cityCnt:number=0;
  url="http://localhost:3000/cities/";
  constructor(private http:HttpClient) {
      this.getAllCities().subscribe((res:City[])=>{
        this.allCities=res;},err=>(err))
   }
   getCityByName(name:string):number{
    var city = this.allCities.filter(x => x.name == name);
    if (!city || city.length == 0) {
      return null;
    }
    return city[0].id;
  }
  getCityById(id:number):City{
    var city = this.allCities.filter(x => x.id == id);
    if(!city||city.length==0)
    return null
    return city[0]
  }
  getAllCities():Observable<City[]>{
    return this.http.get<City[]>(this.url+"all")
  }
}
