import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IExercise } from 'src/app/workout/exercise-daily/exercise';
import { ExerciseService } from 'src/app/workout/exercise-daily/exercise.service';

@Component({
  selector: 'app-exercise-daily',
  templateUrl: './exercise-daily.component.html',
  styleUrls: ['./exercise-daily.component.css']
})
export class ExerciseDailyComponent implements OnInit {
  exercises: IExercise[] | undefined;
  errorMessage = '';

  constructor(private route: ActivatedRoute,
    private router: Router, private exerciseService: ExerciseService) { }
  ngOnInit(): void {    
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    let param = this.route.snapshot.paramMap.get('day');
    if(param) {
      this.getExercise(param);
    }
    console.log(param);
  }
  getExercise(day: string): void {
    this.exerciseService.getAll().subscribe({
      next: exercise => {
        this.exercises = exercise.filter(data => {return data.id == day;});
        console.log(this.exercises);
      }
    })
  }
  onBack(): void {
    this.router.navigate(['/work-out']);
  }


}
