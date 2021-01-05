import { Component, Input, OnInit } from '@angular/core';
import { BMIService } from '../bmi.service';
import { IBmi, IBodyFat } from '../bmi';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
  providers: [BMIService],
})
export class StatusComponent implements OnInit {
  weightStatus: IBmi[]=[];
  bodyFatStatus: IBodyFat[]=[];  
  errorMessage: string='';
  @Input() bmi: number;
  @Input() bodyFat: number;  
  @Input() bodyFatWeight: number;
  @Input() gender: number;
  @Input() unit: string;
  constructor( private bmiService: BMIService) { }

  ngOnInit(): void {
    this.bmiService.getBmi().subscribe({
      next: weightStatus => this.weightStatus = weightStatus,
      error: err => this.errorMessage = err
    });
    this.bmiService.getBodyFat().subscribe({
      next: bodyFatStatus => this.bodyFatStatus = bodyFatStatus,
      error: err => this.errorMessage = err
    });
  }

  whichWeightStatus(weight: number): number {
    if(weight < 18.5) return 1;
    else if (weight >= 18.5 && weight < 25) return 2;
    else if (weight >= 25.0 && weight < 30) return 3;
    else return 4;
  }

  whichBodyFatStatus(value: number, gender: number): number {
    if(gender === 0) {
        if (value < 2) return 1;
        else if(value >= 2 && value < 6) return 2;
        else if (value >=6 && value < 14) return 3;
        else if (value >=14 && value < 18) return 4;
        else if(value >= 18 && value < 25) return 5;
        else if(value >= 25) return 6;
      } 
    if(gender === 1) {
        if (value < 10) return 1;
        else if(value >= 10 && value < 14) return 2;
        else if (value >= 14 && value < 21) return 3;
        else if (value >= 21 && value < 25) return 4;
        else if(value >= 25 && value < 32) return 5;
        else if(value >= 31) return 6;
      } 
    return 0;
  }

}
