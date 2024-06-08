// import {Component, OnInit} from '@angular/core';
// import {ActivatedRoute} from "@angular/router";
// import {ReviewsService} from "../../services/reviews.services";
// import {CommonModule} from "@angular/common";
// import {IReviews} from "../../models/reviews/reviews.model";
// import {Observable, switchMap} from "rxjs";
//
//
// @Component({
//   selector: 'app-reviews',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './reviews.component.html',
//   styleUrl: './reviews.component.scss'
// })
// export class ReviewsComponent implements OnInit {
//
//   public reviews$!: Observable<IReviews[]>;
//
//   constructor(
//     private route: ActivatedRoute,
//     public reviewsService: ReviewsService
//   ) {
//   }
//
//
//   ngOnInit(): void {
//     this.reviews$ = this.route.params.pipe(
//       switchMap(params => {
//         // извлекает значение параметра id из текущих параметров маршрута. Например, если URL страницы выглядит так: /reviews/antarctica, то id будет равно "antarctica".
//         const id = params['id'];
//         // Вызывается getReviews('antarctica'), что возвращает массив отзывов для Антарктиды.
//         return this.reviewsService.getReviews(id);
//       })
//     );
//   }
// }


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

  public reviews$!: Observable<IReview[]>;

  constructor(
    private route: ActivatedRoute,
    private reviewsServices: ReviewsServices,
    private router: ActivatedRoute,
  ) {
    // const {id} = this.router.snapshot.params;
    //
    // if (id) {
    //   // Если есть параметр id в URL, значит, это запрос на отображение одиночного поста
    //   this.reviews$ = this.reviewsServices.getAllById(id);
    //   console.log('this.reviews$', this.reviews$)
    // }
  }

  ngOnInit(): void {
    this.reviews$ = this.route.params.pipe(
      //switchMap автоматически управляет отменой предыдущих запросов, что предотвращает потенциальные утечки памяти и обработку устаревших данных Например, если URL меняется с /reviews/antarctica на /reviews/arctic, текущий запрос для Антарктиды будет отменен, и начнется новый запрос для Арктики.
      switchMap(params => {
         // извлекает значение параметра id из текущих параметров маршрута. Например, если URL страницы выглядит так: /reviews/antarctica, то id будет равно "antarctica".
        const id = params['id'];
        console.log('Extracted id from route params:', id); // Логируем id
        // Вызывается getAllById('antarctica'), что возвращает массив отзывов для Антарктиды.
        return this.reviewsServices.getAllById(id);
      })
    )
  }
}
