import {AfterViewInit, Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {CarouselModule} from "ngx-owl-carousel-o";
import {CommonModule, isPlatformBrowser} from "@angular/common";
import {ReviewsServices} from "../../services/reviews.services";
import {IReview} from "../../../../environments/environments";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-comments-slider',
  standalone: true,
  imports: [
    CarouselModule, //для работы модуля
    CommonModule //для работы *ngFor
  ],
  templateUrl: './comments-slider.component.html',
  styleUrl: './comments-slider.component.scss',
  host: {ngSkipHydration: 'true'},
})
export class CommentsSliderComponent implements OnInit, OnDestroy {

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
  isTransitioning = false; // флаг, указывающий, происходит ли в данный момент переход между слайдами.
  currentIndex = 0; //currentIndex: индекс текущего отображаемого комментария.
  changeIndex = 0; //индекс следующего или предыдущего комментария для отображения.
  autoSlideInterval!: NodeJS.Timeout | number | null; //setInterval возвращает NodeJS.Timeout (в Node.js) или number (в браузере), но не просто number
  private lastClickTime = 0; // 0 секунд, делаем для того что бы нельзя было спамить переключение слайдов
  private clickCooldown = 2000; // 2 секунды, делаем для того что бы нельзя было спамить переключение слайдов

  constructor(
    private route: ActivatedRoute,
    private reviewsServices: ReviewsServices,
    //SSR мешает работать setInterval, что бы убрать SSR прописываем
    @Inject(PLATFORM_ID) private platform_id: Object
  ) {
  }

  ngOnInit(): void {
    // здесь присваиваем значение объявленному выше свойству
    if (isPlatformBrowser(this.platform_id)) {
      this.comments$ = this.reviewsServices.getFavoritesReviews();
      //Этот код обеспечивает, что автоматическая смена слайдов начнется только после того, как комментарии будут фактически загружены и только если они есть.
      this.comments$.pipe(first()).subscribe(comments => {
        if (comments.length > 0) {
          this.startAutoSlide(comments);
        }
      });
    }
  }

  //Пользователь нажимает на стрелку "вперед".Вызывается метод nextComment(comments):
  nextComment(comments: IReview[]) {
    // Игнорируем клик, если прошло меньше 2 секунд
    const currentTime = Date.now();
    if (currentTime - this.lastClickTime < this.clickCooldown) {
      return;
    }
    this.lastClickTime = currentTime;
    //Устанавливается isTransitioning = true, таким образом заставляем срабатывать [class.leaving]="isTransitioning"
    this.isTransitioning = true;
    //Вычисляется changeIndex для следующего комментария.
    this.changeIndex = (this.currentIndex + 1) % comments.length;
    setTimeout(() => {
      // причина того что change_hidden_slide играет ключевую роль в создании плавного перехода, временно становясь видимым во время анимации, но в итоге всегда возвращается в скрытое состояние, уступая место обновленному current-slide.
      this.currentIndex = this.changeIndex;
      // когда isTransitioning устанавливается в false и завершается setTimeout current-slide то теперь отображает новый комментарий и теряет класс leaving и активируется active.
      this.isTransitioning = false;
      //время на протяжении которого переключается слайд в левую сторону
    }, 1000);
    //при смене слайда вручную стопаєм автопереключение
    this.stopAutoSlide()
  }

  prevComment(comments: IReview[]) {
    // Игнорируем клик, если прошло меньше 2 секунд
    const currentTime = Date.now();
    if (currentTime - this.lastClickTime < this.clickCooldown) {
      return;
    }
    this.lastClickTime = currentTime;
    this.isTransitioning = true;
    this.changeIndex = (this.currentIndex - 1 + comments.length) % comments.length;
    setTimeout(() => {
      this.currentIndex = this.changeIndex;
      this.isTransitioning = false;
      //время на протяжении которого переключается слайд в правую сторону
    }, 1000);
    //при смене слайда вручную стопаєм автопереключение
    this.stopAutoSlide()
  }

  goToComment(index: number) {
    // Игнорируем клик, если прошло меньше 2 секунд
    const currentTime = Date.now();
    // Здесь мы вычисляем разницу между текущим временем и временем последнего клика.
    if (currentTime - this.lastClickTime < this.clickCooldown) {
      return;
    }
    this.lastClickTime = currentTime;
    if (index !== this.currentIndex) {
      //срабатывает класс leaving на current-slide
      this.isTransitioning = true;
      this.changeIndex = index;
      setTimeout(() => {
        this.currentIndex = this.changeIndex;
        // срабатывает active на current-slide
        this.isTransitioning = false;
        //время на протяжении которого переключается слайд чере точки
      }, 1000);
    }
    //при смене слайда вручную стопаєм автопереключение
    this.stopAutoSlide()
  }

  startAutoSlide(comments: IReview[]) {
    this.stopAutoSlide(); // Остановить предыдущий интервал, если он существует
    if (comments.length > 1) { // Запускаем только если есть более одного комментария
      this.autoSlideInterval = setInterval(() => {
        this.nextComment(comments);
      }, 3000); // Меняет слайд каждые 3 секунды
    }
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }
}
