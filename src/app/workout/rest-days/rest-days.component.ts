import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rest-days',
  templateUrl: './rest-days.component.html',
  styleUrls: ['./rest-days.component.css']
})
export class RestDaysComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  onBack(): void {
    this.router.navigate(['/work-out']);
  }

  onBackHome() {
    this.router.navigate(['/home']);
  }

}
