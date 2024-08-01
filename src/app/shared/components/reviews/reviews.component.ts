import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {Observable, switchMap} from "rxjs";
import {IReview} from "../../../../environments/environments";
import {ReviewsServices} from "../../services/reviews.services";
import {ArraysService} from "../../services/arrays.services";
import {ITravels} from "../../models/arrays/arrays.model";
import {map, tap} from "rxjs/operators";


@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule //для работы routerLink что бы работала кнопка back
  ],
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
  // Символ $ в конце имени - это распространенное соглашение для обозначения Observable. никакой функции не выполняет, В контексте Angular компонентов, public свойства доступны в шаблоне компонента (HTML), в то время как private свойства недоступны.
  public reviews$!: Observable<IReview[]>;
  public currentTravel$!: Observable<ITravels | undefined>; //задаем типизацию, иначе не хочет компонент брать ArraysService как массив, ITravel (без квадратных скобок - []) обычно обозначает интерфейс или тип для одного объекта путешествия( то что в {} ), а не массива путешествий(то что в []). undefined обязателене так как find() может вернуть undefined, если элемент не найден.

  constructor(
    private route: ActivatedRoute, //это сервис Angular, который предоставляет информацию о текущем активном маршруте. Angular Router извлекает значение :id из URL и делает его доступным через ActivatedRoute
    private reviewsServices: ReviewsServices,
    private arraysService: ArraysService
  ) {
    // this.currentTravel$ = this.arraysService.getTravels(); // Чтобы компонент знал, какие путешествия нужно отображать, необходимо инициализировать это свойство данными. Метод getTravels из сервиса TravelsService возвращает массив путешествий, который используется для этой цели.
  }

  ngOnInit(): void {
     // console.log("Начало ngOnInit");
     //
     //  this.currentTravel$ = this.route.params.pipe(
     //    tap(params => console.log("Параметры маршрута:", params)),
     //    map(params => {
     //      const id = params['id'];
     //      console.log("Извлеченный id:", id);
     //      return id;
     //    }),
     //    map(id => {
     //      const travels = this.arraysService.getTravels();
     //      console.log("Все путешествия:", travels);
     //      const foundTravel = travels.find(travel => travel.id === id);
     //      console.log("Найденное путешествие:", foundTravel);
     //      return foundTravel;
     //    })
     //  );
     //
     //  console.log("Конец ngOnInit");
     //
     //  // Подписка для демонстрации финального результата
     //  this.currentTravel$.subscribe(travel => {
     //    console.log("Финальный результат currentTravel$:", travel);
     //  });

    // мы перешли на страницу по URL /reviews/arctic - это например, аналогично для любой другой страницы.  this.route.params дает Observable, который эмитит объект параметров маршрута, в данном случае эмитит только id и выидит следующее: { id: 'arctic' }.
    this.currentTravel$ = this.route.params.pipe(
      //Извлекает значение id из объекта параметров. После этого шага мы получаем обычную строку: 'arctic'. Т.е. если URL был /reviews/arctic, то params будет объектом { id: 'arctic' }, и после этой операции map мы получим просто строку 'arctic' уже не как объект.
      map(params => params['id']),
      //this.arraysService.getTravels() возвращает массив путешествий. find ищет элемент в этом массиве, где travel.id === id. Для нашего примера это будет эквивалентно: ['antarctica', 'arctic', 'greenland'].find(travel => travel.id === 'arctic'),  как результат find завершает весь процес и мы получаем полностью нужный нам объект например Антарктиду     {name: 'Antarctica', id: 'antarctica', image: './assets/images/travels/antarctica.webp', reviewsLink: '#'},
      map(id => this.arraysService.getTravels().find(travel => travel.id === id))
    );

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
