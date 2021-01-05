import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { valueValidator } from '../shared/custom-validator.validator';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class BmiComponent implements OnInit {
  bmiFormGroup: FormGroup;
  _weight: number = 0;
  _height: number = 0;
  _age: number = 0;
  _gender: number = 0;
  _bmi: number = 0;
  _bodyFat: number = 0;
  _bodyFatWeight: number = 0;
  _unit: string;
  constructor(private _formBuilder: FormBuilder,) {}
  
  weightValue(value: number): number {
    if (this.bmiFormGroup.value.selectedWeightUnit === 'lbs') {
      return value * 0.45359237;
    } else return value;
  }

  heightValue(value: number): number {
    if(this.bmiFormGroup.value.selectedHeightUnit === 'ft'){
      return value / 0.032808;
    } else return value;
  }

  whichGender(gender: string): number {
    if(gender === 'male') return 0;
    if(gender === 'female') return 1;
    return 2;
  }

  calculation(): void {
    this._weight = this.weightValue(this.bmiFormGroup.value.weight);
    this._height = this.heightValue(this.bmiFormGroup.value.height);
    this._age = this.bmiFormGroup.value.age;   
    this._gender = this.whichGender(this.bmiFormGroup.value.whichGender);

    this._bmi = this._weight / ((this._height/100) ** 2);
    this._bodyFat = -44.988 + (0.503 * this._age) + (10.689 * this._gender)
                    + (3.172 * this._bmi) - (0.026 * (this._bmi ** 2)) + (0.181 * this._bmi * this._gender)
                    - (0.02 * this._bmi * this._age) - (0.005 * (this._bmi ** 2) * this._gender) + (0.00021 * (this._bmi ** 2) * this._age);
    this._bodyFatWeight = this._bodyFat * this.bmiFormGroup.value.weight / 100;
    this._unit = this.bmiFormGroup.value.selectedWeightUnit;

  }

  
  ngOnInit() {
    this.bmiFormGroup = this._formBuilder.group({
      weight: ['', [Validators.required, valueValidator]],
      selectedWeightUnit: ['lbs', Validators.required],
      height: ['', [Validators.required, valueValidator]],
      selectedHeightUnit: ['ft', Validators.required],
      whichGender: ['female', Validators.required],
      age: ['',[Validators.required, valueValidator]],      
    });    
  }
}
