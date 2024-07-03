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

  //два след строки для двух ковычек svg
  fillColor: string = '#FAA700';
  pathData: string = 'M86.586 49.574c-19.8 13.01-37.742 37.789-39.6 57.614.62 0 4.949-.62 8.042-.62 17.326 0 29.7 13.006 29.7 31.591a32.635 32.635 0 0 1-32.793 32.834c-20.416 0-38.358-16.727-38.358-47.081 0-37.789 21.654-72.477 50.116-92.919zm98.994 0c-19.8 13.01-37.123 37.789-39.6 57.614.616 0 4.948-.62 8.042-.62 17.322 0 30.316 13.006 30.316 31.591 0 17.964-14.848 32.834-33.41 32.834-20.416 0-38.358-16.727-38.358-47.081 0-37.789 21.652-72.477 50.113-92.919z';
  // Суть роли Observable на примере, представьте, что вы создаете приложение, которое показывает текущую температуру. Observable может:
  // Периодически получать обновления о температуре.
  // Доставлять эти данные в ваше приложение.
  // Автоматически обновлять интерфейс при изменении температуры.
  // Прекратить получение данных, когда пользователь закрывает приложение.

  // в comments$! данные поступают из this.comments$ = this.reviewsServices.getFavoritesReviews(); что находится в ngOnInit()
  // Символ $ в конце имени - это распространенное соглашение для обозначения Observable. никакой функции не выполняет
  // Если вы уверены, что comments$ будет инициализирован в ngOnInit(), можно использовать оператор "!",
  comments$!: Observable<IReview[]>;
  isTransitioning = false;
  currentIndex = 0;
  changeIndex = 0;

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
    this.isTransitioning = true;
    this.changeIndex = (this.currentIndex + 1) % comments.length;
    setTimeout(() => {
      this.currentIndex = this.changeIndex;
      this.isTransitioning = false;
    }, 500);
  }

  prevComment(comments: IReview[]) {
    this.isTransitioning = true;
    this.changeIndex = (this.currentIndex - 1 + comments.length) % comments.length;
    setTimeout(() => {
      this.currentIndex = this.changeIndex;
      this.isTransitioning = false;
    }, 500);
  }

  goToComment(index: number) {
    if (index !== this.currentIndex) {
      this.isTransitioning = true;
      this.changeIndex = index;
      setTimeout(() => {
        this.currentIndex = this.changeIndex;
        this.isTransitioning = false;
      }, 500);
    }
  }
}
