import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestDaysComponent } from './rest-days.component';

describe('RestDaysComponent', () => {
  let component: RestDaysComponent;
  let fixture: ComponentFixture<RestDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
