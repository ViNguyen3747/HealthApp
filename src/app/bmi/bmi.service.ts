import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';

import { IBmi, IBodyFat } from './bmi';
@Injectable({
  providedIn: 'root'
})
export class BMIService {
  private weightStatusUrl = 'api/weightStatus.json';
  private bodyFatStatusUrl = 'api/bodyFatStatus.json';
  
  constructor(private http: HttpClient) {}
  getBmi(): Observable<IBmi[]> {
    return this.http.get<IBmi[]>(this.weightStatusUrl).pipe(
      catchError(this.handleError)
    );
  }

  getBodyFat():Observable<IBodyFat[]> {
    return this.http.get<IBodyFat[]>(this.bodyFatStatusUrl).pipe(
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
