import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDailyComponent } from './exercise-daily.component';

describe('ExerciseDailyComponent', () => {
  let component: ExerciseDailyComponent;
  let fixture: ComponentFixture<ExerciseDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseDailyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
