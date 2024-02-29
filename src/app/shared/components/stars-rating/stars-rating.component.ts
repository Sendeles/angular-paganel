import { Component } from '@angular/core';

@Component({
  selector: 'app-stars-rating',
  standalone: true,
  imports: [],
  templateUrl: './stars-rating.component.html',
  styleUrl: './stars-rating.component.scss'
})
export class StarsRatingComponent {
  rating = 0;
  hoverRating = 0;

  rate(value: number) {
    this.rating = value;
    console.log('Rating:', this.rating);
  }

  hover(value: number) {
    this.hoverRating = value;
  }
}
