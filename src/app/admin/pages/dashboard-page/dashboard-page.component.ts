import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReviewsServices} from "../../../shared/services/reviews.services";
import {Subscription} from "rxjs";
import {IReview} from "../../../../environments/environments";
import {FormsModule} from "@angular/forms";
import {CommonModule, DatePipe} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {AlertsServices} from "../../../shared/services/alerts.services";
import {RouterModule} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CountrySelectionComponent} from "../../../shared/components/country-selection/country-selection.component";
import {TravelsService} from "../../../shared/services/travels.services";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    RouterModule, // для переноса при нажатии кнопки edit
    FormsModule, //для ngModule который я использую в dashboard-page.html
    DatePipe, // для встроенной pipe date в html которую я віделил !!! <td>{{review.date | !!!date:!!! 'dd.MM.yyyy, HH:mm:ss':'ua'}}</td>
    CommonModule, // для *ngIf, *ngFor, [ngClass], [ngStyle] и другие
    SharedModule // импортируем его потому что в нем находится SearchPipe который нам здесь нужен
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  reviews: IReview[] = []; // добовляя = [] мы инициализируем reviews пустым массивом в компоненте, Angular будет гарантировать, что он никогда не будет undefined, и ошибка не возникнет.
  pSub?: Subscription; //pSub является опциональной переменной типа Subscription. В Angular и других фреймворках, основанных на RxJS, объект Subscription используется для управления подписками на потоки данных, особенно в контексте асинхронных операций, таких как запросы к серверу или обновления UI на основе изменений данных.
  rSub?: Subscription;
  searchReview = '';

  constructor(
    private travelsService: TravelsService, // Инжектируйте TravelsService
    private reviewsServices: ReviewsServices,
    private alertServices: AlertsServices,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    //получаю посты от getAll
    this.pSub = this.reviewsServices.getAll().subscribe(reviews => {
      //присваиваю переменной пост(массиву) тот респонс который приходит
      this.reviews = reviews.filter((review) => review.date)
      console.log('this.reviews', this.reviews)
    })
  }

  //удаляю конкретный пост
  remove(id: string) {
    this.rSub = this.reviewsServices.remove(id).subscribe(() => {
      //проверяем не является ли this.reviews undefined и если нет, перебираем список постов после удаления какого-то поста
      if (this.reviews) {
        this.reviews = this.reviews.filter((review) => review.id !== id);
      }
      this.alertServices.delete('Пост был удален')
    })
  }

  add(review: IReview) {
    console.log('Function add started with review:', review); // Логируем входные данные функции

    const travels = this.travelsService.getTravels(); // Получите массив travels из сервиса  console.log('Retrieved travels from travelsService:', travels); // Логируем данные travels
    console.log('Retrieved travels from travelsService:', travels); // Логируем данные travels

    //этот код исключительно для того что бы сработал консоль лог
    const data = { travels, review };
    console.log('Data being passed to the dialog:', data);

    //this.dialog является экземпляром MatDialog, который предоставляется Angular Material и используется для управления диалоговыми окнами в приложении.
    this.dialog.open(CountrySelectionComponent, {
      width: '400px',
      data: {travels, review}// Передайте весь массив travels в качестве данных диалогового окна, под review только конкретно выбранный отзыв
    }).afterClosed().subscribe((reviewId) => {  //получаю reviewId при закрытии модального окна, под reviewId - передается this.data.review.id из country-selection.component.ts
      if (reviewId) {
        this.remove(reviewId);
        // Обработка выбранной страны
        console.log(`Выбрано id: ${reviewId}`);
      }
    });
  }

  ngOnDestroy() {
    //отписка для того что бы не было утечек памяти
    if (this.pSub) {
      this.pSub.unsubscribe()
    }

    if (this.rSub) {
      this.rSub.unsubscribe()
    }
  }
}
