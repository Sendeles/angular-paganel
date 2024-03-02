import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ReviewsService} from "../../services/reviews.services";
import {CommonModule} from "@angular/common";
import {IReviews} from "../../models/reviews/reviews.model";
import {Observable, switchMap} from "rxjs";


@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {

  public reviews$!: Observable<IReviews[]>;

  constructor(
    private route: ActivatedRoute,
    public reviewsService: ReviewsService
  ) {
  }


  ngOnInit(): void {
    this.reviews$ = this.route.params.pipe(
      switchMap(params => {
        // извлекает значение параметра id из текущих параметров маршрута. Например, если URL страницы выглядит так: /reviews/antarctica, то id будет равно "antarctica".
        const id = params['id'];
        // Вызывается getReviews('antarctica'), что возвращает массив отзывов для Антарктиды.
        return this.reviewsService.getReviews(id);
      })
    );
  }
}
