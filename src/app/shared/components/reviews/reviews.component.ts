import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommonModule} from "@angular/common";
import {Observable, switchMap} from "rxjs";
import {IReview} from "../../../../environments/environments";
import {ReviewsServices} from "../../services/reviews.services";


@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {

  // Суть роли Observable на примере, представьте, что вы создаете приложение, которое показывает текущую температуру. Observable может:
  // Периодически получать обновления о температуре.
  // Доставлять эти данные в ваше приложение.
  // Автоматически обновлять интерфейс при изменении температуры.
  // Прекратить получение данных, когда пользователь закрывает приложение.


  //в reviews$ данные поступают из сервиса ngOnInit(),
  // Символ $ в конце имени - это распространенное соглашение для обозначения Observable. никакой функции не выполняет
  public reviews$!: Observable<IReview[]>;

  constructor(
    private route: ActivatedRoute, //это сервис Angular, который предоставляет информацию о текущем активном маршруте. Angular Router извлекает значение :id из URL и делает его доступным через ActivatedRoute
    private reviewsServices: ReviewsServices
  ) {
  }

  ngOnInit(): void {
    //this.route.params это Observable, который эмитит новое значение каждый раз, когда параметры маршрута меняются.
    this.reviews$ = this.route.params.pipe(
      //switchMap автоматически управляет отменой предыдущих запросов, что предотвращает потенциальные утечки памяти и обработку устаревших данных Например, если URL меняется с /reviews/antarctica на /reviews/arctic, текущий запрос для Антарктиды будет отменен, и начнется новый запрос для Арктики.
      switchMap(params => {
         // извлекает значение параметра id из текущих параметров маршрута. Например, если URL страницы выглядит так: /reviews/antarctica, то id будет равно "antarctica", если /reviews/arctic то id будет равно "arctic".
        const id = params['id'];
        console.log('Extracted id from route params:', id); // Логируем id
        // Вызывается getAllById('antarctica'), что возвращает массив отзывов для Антарктиды, другими словами он отправляет след запрос ${environment.firebaseConfig.databaseURL}${IPagelink.REVIEW_PAGE}/antarctica.json.
        return this.reviewsServices.getAllById(id);
      })
    )
  }
}
