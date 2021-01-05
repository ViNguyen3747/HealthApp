import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BmiComponent } from './bmi/bmi.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutModule } from './workout/workout.module';

const routes: Routes = [     
  { path: 'home', component: HomeComponent},
  { path: 'bmi', component: BmiComponent},
  { path: 'work-out', component: WorkoutComponent},  
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes),
           WorkoutModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
