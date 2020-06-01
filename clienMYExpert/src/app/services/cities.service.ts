import { Injectable } from '@angular/core';
import { City } from '../classes/city';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  allCities:City[]=[]
  cityCnt:number=0;
  constructor() {
    this.allCities.push(new City(this.cityCnt++,"Yerushalaim"));
    this.allCities.push(new City(this.cityCnt++,"Tel Aviv"));
    this.allCities.push(new City(this.cityCnt++,"Chaifa"));
    this.allCities.push(new City(this.cityCnt++,"Beer Sheva"));
    this.allCities.push(new City(this.cityCnt++,"Ramat Gan"));
    this.allCities.push(new City(this.cityCnt++,"Tsfat"));
    this.allCities.push(new City(this.cityCnt++,"Modihin"));
    this.allCities.push(new City(this.cityCnt++,"Petach Tikva"));
    this.allCities.push(new City(this.cityCnt++,"Bney Brak"));
    this.allCities.push(new City(this.cityCnt++,"Beit Shemesh"));
   }
   getCityByName(name:string):City{
    this.allCities.forEach(city => {
      if(city.cityName.toLowerCase==name.toLowerCase)
        return city;
    });
    return null
  }
  getCityById(id:number):City{
    this.allCities.forEach(city => {
      if(city.id==id)
        return city;
    });
    return null;
  }
}
