import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WorkoutComponent } from './workout.component';
import { ExerciseDailyComponent } from './exercise-daily/exercise-daily.component';
import { CountdownModule } from 'ngx-countdown';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { RestDaysComponent } from './rest-days/rest-days.component';
import { SafeURLPipe } from './url-pipe/safe-url.pipe';
@NgModule({
  declarations: [
    ExerciseDailyComponent,
    SafeURLPipe,
    WorkoutComponent,
    RestDaysComponent
  ],
  imports: [
    CommonModule,
    CountdownModule,
    YouTubePlayerModule,
    MatTabsModule,
    MatIconModule,
    MatStepperModule,
    MatButtonModule ,
    RouterModule.forChild([
      { path: 'work-out', component: WorkoutComponent},
      {
        path: 'work-out/rest-day',        
        component: RestDaysComponent
      },
      {
        path: 'work-out/:day',        
        component: ExerciseDailyComponent
      },
      
    ])
  ],
  exports: [
  ]
})
export class WorkoutModule { }
