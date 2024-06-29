import {Component, OnInit} from '@angular/core';
import {CarouselModule, OwlOptions} from "ngx-owl-carousel-o";
import {ICustomSlideModel} from "../../models/comments-slider/comments-slider.model";
import {CommonModule} from "@angular/common";
import {ReviewsServices} from "../../services/reviews.services";
import {IReview} from "../../../../environments/environments";
import {ActivatedRoute} from "@angular/router";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-comments-slider',
  standalone: true,
  imports: [
    CarouselModule, //для работы модуля
    CommonModule //для работы *ngFor
  ],
  templateUrl: './comments-slider.component.html',
  styleUrl: './comments-slider.component.scss'
})
export class CommentsSliderComponent implements OnInit {

  comments: IReview[] = []; //мы определили свойство comments как массив. Это означает, что comments должен быть заполнен массивом объектов IReview, чтобы корректно отображаться в шаблоне.
  currentIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private reviewsServices: ReviewsServices,
  ) {
  }

  ngOnInit(): void {
    //здесь присваиваем значение объявленному выше свойству
    this.reviewsServices.getFavoritesReviews().subscribe(reviews => {
      this.comments = reviews;
    });
  }

  nextComment() {
    this.currentIndex = (this.currentIndex + 1) % this.comments.length;
  }

  prevComment() {
    this.currentIndex = (this.currentIndex - 1 + this.comments.length) % this.comments.length;
  }

  goToComment(index: number) {
    this.currentIndex = index;
  }
}
