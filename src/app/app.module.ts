import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule} from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WorkoutModule } from './workout/workout.module';
import { BmiModule } from './bmi/bmi.module';
import { WeatherModule } from './home/weather.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [ 
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatSidenavModule,
      WeatherModule,
      BmiModule,
      WorkoutModule,
      SharedModule
  ],

  declarations: [ AppComponent,
  
  PageNotFoundComponent,
  ],
  providers: [],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }