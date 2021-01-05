import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  catchError, tap } from 'rxjs/operators';
import { IWeather } from './weather';
import { IRunning } from './running';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseWeatherAPI = 'https://api.openweathermap.org/data/2.5/weather';
  private  APIkey = '27cc0f9e54d73d8e67bfafb8beef78e4';
  private runningUrl = 'api/runningTips.json';


  constructor(private http: HttpClient) {}

  getWeatherData(city: string, units: string): Observable<IWeather> {
    let params = new HttpParams()
      .set('q',city)
      .set('appid', this.APIkey)
      .set('units',units);
    return this.http.get<IWeather>(this.baseWeatherAPI,{params}).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }
  getWeatherById(id: string, units: string): Observable<IWeather> {
    let params = new HttpParams()
      .set('id', id)
      .set('appid', this.APIkey)
      .set('units',units);
    return this.http.get<IWeather>(this.baseWeatherAPI,{params}).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }
  
  getCities(): Observable<any> {
    return this.http.get('api/city.list.json').pipe(
      catchError(this.handleError)
    );
  }

//Source: https://www.cosmopolitan.com/health-fitness/advice/a32749/exactly-what-to-wear-to-run-comfortably-in-any-weather/
    getRunningTips(): Observable<IRunning[]> {
    return this.http.get<IRunning[]>(this.runningUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      //A client-side or network error occured.
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      //The backend returned an unsuccesful response code
      //the response body ma contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
