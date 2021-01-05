import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CityValidator } from '../shared/custom-validator.validator';
import { ICity } from './city';
import { IRunning } from './running';
import { IWeather } from './weather';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  weatherData: IWeather;
  localTime: any;
  runningTips: IRunning[] = [];  
  cityList: ICity[] = [];  
  cityValid: string[] = [];
  tipList: string[];
  isDay: boolean = false;
  loading: boolean;
  weatherDataGroup: FormGroup;
  filteredOptions: Observable<any[]>;
  id: string;
  sameNameCities: boolean;
  state: string;
  extremeTemp: boolean = false;
  selectedCity: any;
  unit: string;
  showTip: boolean;
  city: string = "dallas";

  constructor(private _formBuilder: FormBuilder, private weatherService: WeatherService) {}  

  ngOnInit() {
    this.weatherService.getRunningTips().subscribe({
      next: runningTips => this.runningTips = runningTips
    });
    this.weatherService.getCities().subscribe({
      next: data => {
        this.cityList = data;
        data.forEach(element => this.cityValid.push(element.name.toLowerCase()));
      },
      error: err => console.log(err)
    });   
    this.weatherDataGroup =  this._formBuilder.group({
      city: ['',[Validators.required, CityValidator(this.cityValid)]],
      unit: ['metric']
    });       
    this.filteredOptions = this.weatherDataGroup.get('city').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)
      )
    );

    this.getWeatherByCity();
  }

  getWeatherByCity() {
    this.showTip = false;
    this.loading = true;

    this.unit = this.weatherDataGroup.value.unit;
    if(this.weatherDataGroup.value.city) {
      this.city = this.weatherDataGroup.value.city;
    }

    if (this.sameNameCities) {
      this.state = this.selectedCity.state;
      this.weatherService.getWeatherById(this.selectedCity.id,this.unit).subscribe({
        next: data => {          
          this.loading = false;
          this.weatherData = data;
          this.time(data);
        },
        error: err => console.log(err)
      });
    } else {
    this.weatherService.getWeatherData(this.city, this.unit).subscribe({
      next: data => {                  
        this.loading = false;
        this.weatherData = data;
        this.time(data);      
      },
      error: err => console.log(err)
    });
  }
  }

  time(weatherData: IWeather) {    
    let currentDate = new Date();
    let utc = currentDate.getTime() + (currentDate.getTimezoneOffset() * 60000);
    this.localTime = new Date (utc + 3600000 * (weatherData.timezone/ 3600)); 
    if  (currentDate.getTime() < (weatherData.sys.sunset * 1000) &&
            currentDate.getTime() > (weatherData.sys.sunrise * 1000)) {this.isDay = true;}
            else this.isDay = false;
  }

  findTips(temp: number, unit: string) {
    let tip = -1;
    if (unit == 'metric') {
      temp = temp * 9/5 + 32;
    }
    if(temp >= 20 && temp < 25) tip = 0;
    if(temp >= 25 && temp < 30) tip = 1;
    if(temp >= 30 && temp < 35) tip = 2;
    if(temp >= 35 && temp < 40) tip = 3;
    if(temp >= 40 && temp < 45) tip = 4;
    if(temp >= 45 && temp < 50) tip = 5;
    if(temp >= 50 && temp < 55) tip = 6;
    if(temp >= 55 && temp < 60) tip = 7;
    if(temp >= 60 && temp < 70) tip = 8;
    if(temp >= 70 && temp < 80) tip = 9;
    if(temp >= 80) tip = 10;
    console.log(this.runningTips);
    this.tipList = this.runningTips[tip].outfits;
  }
  extremeWeather(temp: number, unit:string) {
    if (unit == 'metric') {
      temp = temp * 9/5 + 32;
    }
    if (temp > 105 || temp < 20)  this.extremeTemp = true;
    else this.extremeTemp = false;
  }

  private _filter(value:string):string[] {   
    const filterValue = value.toLowerCase();
    this.sameNameCities = false;
    let list = [];
    this.cityList.forEach(element =>{
      if(element.name.toLowerCase().indexOf(filterValue) === 0)
      {
        list.push({'id': element.id, 'name': element.name, 'state': element.state, 'country': element.country});
      }
    })
    return list.slice(0,200);
  }

  changeValue(value: any){
    this.sameNameCities = true;
    this.selectedCity = value;
  }

  toggleTips() {
    this.showTip = !this.showTip;
    this.extremeWeather(this.weatherData.main.temp, this.unit);
    this.findTips(this.weatherData.main.temp, this.unit);
  }
}
