import {Component, OnInit} from '@angular/core';
import {CarouselModule, OwlOptions} from "ngx-owl-carousel-o";
import {CommonModule} from "@angular/common";
import {ReviewsServices} from "../../services/reviews.services";
import {IReview} from "../../../../environments/environments";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

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

  // Суть роли Observable на примере, представьте, что вы создаете приложение, которое показывает текущую температуру. Observable может:
  // Периодически получать обновления о температуре.
  // Доставлять эти данные в ваше приложение.
  // Автоматически обновлять интерфейс при изменении температуры.
  // Прекратить получение данных, когда пользователь закрывает приложение.

  // в comments$! данные поступают из this.comments$ = this.reviewsServices.getFavoritesReviews(); что находится в ngOnInit()
  // Символ $ в конце имени - это распространенное соглашение для обозначения Observable. никакой функции не выполняет
  // Если вы уверены, что comments$ будет инициализирован в ngOnInit(), можно использовать оператор "!",
  comments$!: Observable<IReview[]>;
  currentIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private reviewsServices: ReviewsServices,
  ) {
  }

  ngOnInit(): void {
    //здесь присваиваем значение объявленному выше свойству
    this.comments$ = this.reviewsServices.getFavoritesReviews();
  }

  nextComment(comments: IReview[]) {
    this.currentIndex = (this.currentIndex + 1) % comments.length;
  }

  prevComment(comments: IReview[]) {
    this.currentIndex = (this.currentIndex - 1 + comments.length) % comments.length;
  }

  goToComment(index: number) {
    this.currentIndex = index;
  }
}
