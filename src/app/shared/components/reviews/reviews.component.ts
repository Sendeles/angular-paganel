import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ReviewsService} from "../../services/reviews.services";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {

  reviews: any[] = [];

  constructor(
    private route: ActivatedRoute,
    public reviewsService: ReviewsService
  ) { }

  ngOnInit(): void {
    //, используется this.route.params.subscribe для подписки на параметры маршрута. params является Observable объектом, который эмитирует новые значения параметров при каждом изменении URL.
    this.route.params.subscribe(params => {
      //При каждом изменении параметров маршрута, из объекта params извлекается id с помощью const id = params['id'];. Этот id используется для идентификации, какие отзывы нужно загрузить.
      const id = params['id'];
      // Прямое присваивание, так как getReviews возвращает массив, а не Observable
      this.reviews = this.reviewsService.getReviews(id);
    });
  }
}
