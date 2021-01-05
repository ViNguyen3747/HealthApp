import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-macros',
  templateUrl: './macros.component.html',
  styleUrls: ['./macros.component.css']
})
export class MacrosComponent implements OnInit {
  @Input() weight: number;
  @Input() height: number;
  @Input() age: number;
  @Input() gender: number;
  secondFormGroup: FormGroup;
  calories: number=0;
  protein: number=0;
  fat: number=0;
  carbs: number=0;
  activityFactor: number=0;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.secondFormGroup = this._formBuilder.group({
      activityLevel: ['sedentary', Validators.required],      
      protein: ['20', Validators.required],      
      carbs: ['55', Validators.required],
      fat: ['25', Validators.required]
    });
  }

  findActiveLevel(value: string): number {
    if(value == 'sedentary') return 1.2;
    if(value == 'light') return 1.375;
    if(value == 'moderate') return 1.55;
    if(value == 'very') return 1.725;
    if(value == 'extra') return 1.9;
    return 1;
  }
  nutritionCalculation(): void {
    this.activityFactor = this.findActiveLevel(this.secondFormGroup.value.activityLevel);
    this.calories = 10 * this.weight + 6.25 * this.height - 5 * this.age;
    if(this.gender == 0) this.calories = this.calories + 5;
    if(this.gender == 1) this.calories = this.calories - 161;
    this.calories = this.calories * this.activityFactor;
    this.protein = (this.calories / 100 * this.secondFormGroup.value.protein) / 4;
    this.carbs = (this.calories / 100 * this.secondFormGroup.value.carbs) / 4;
    this.fat = (this.calories / 100 * this.secondFormGroup.value.fat) / 9;
  }

}
