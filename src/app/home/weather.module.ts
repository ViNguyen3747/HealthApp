import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [    
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    SharedModule
  ]
})
export class WeatherModule { }
