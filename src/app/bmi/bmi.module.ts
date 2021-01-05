import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmiComponent } from './bmi.component';
import { StatusComponent } from './status/status.component';
import { MacrosComponent } from './macros/macros.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BmiComponent,
    StatusComponent,
    MacrosComponent,  
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class BmiModule { }
