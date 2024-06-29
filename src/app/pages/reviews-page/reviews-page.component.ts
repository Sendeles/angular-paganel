import {Component, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {StarsRatingComponent} from "../../shared/components/stars-rating/stars-rating.component";
import {LanguageServices} from "../../shared/services/language.services";
import {RouterModule} from "@angular/router";
import {FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {ReviewsServices} from "../../shared/services/reviews.services";
import {IReview} from "../../../environments/environments";
import {AlertsServices} from "../../shared/services/alerts.services";
import {MatDialog} from "@angular/material/dialog";
import {AlertsReviewComponent} from "../../shared/components/alerts-review/alerts-review.component";
import {ArraysService} from "../../shared/services/arrays.services";
import {ITravels} from "../../shared/models/arrays/arrays.model";
import {CommentsSliderComponent} from "../../shared/components/comments-slider/comments-slider.component";

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    CommonModule,
    StarsRatingComponent,
    RouterModule,
    ReactiveFormsModule,
    CommentsSliderComponent
  ],
  templateUrl: './reviews-page.component.html',
  styleUrl: './reviews-page.component.scss'
})
export class ReviewsPageComponent {

  travels: ITravels[]; //задаем типизацию, иначе не хочет компонент брать ArraysService как массив
  showError = false; //задаем изначально false что бы не срабатывал showError без конкретного действия, отвечает за срабатывание ошибки с пустыми полями
  putButtonDowner = false // задаем изначально false что бы не срабатывал showError без конкретного действия, отвечает за опускание кнопки ниже в случа срабатывания ошибки с пустыми полями


  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    expedition: new FormControl('', Validators.required),
    social: new FormControl('', Validators.required),
    feedback: new FormControl('', Validators.required),
    date: new FormControl(new Date())
  });

  constructor(
    public languageService: LanguageServices,
    private arraysService: ArraysService, // Добавляем зависимость ArraysService
    private reviewsServices: ReviewsServices,
    private alertServ: AlertsServices,
    private dialog: MatDialog // требуется для открытие модального окна
  ) {
    this.travels = this.arraysService.getTravels(); // Чтобы компонент знал, какие путешествия нужно отображать, необходимо инициализировать это свойство данными. Метод getTravels из сервиса TravelsService возвращает массив путешествий, который используется для этой цели.
  }


  onSubmit() {
    if (this.form.invalid) {
    }
    console.log('Значения формы:', this.form.value);
    //задаем объект для отправки на бекенд в данной формулировке
    const review: IReview = {
      name: this.form.value.name,
      surname: this.form.value.surname,
      expedition: this.form.value.expedition,
      social: this.form.value.social,
      feedback: this.form.value.feedback,
      date: new Date()
    }

    // проверяем, заполнено ли поле expedition
    if (this.form.controls['expedition'].invalid || this.form.controls['feedback'].invalid || this.form.controls['name'].invalid) {
      // если не заполнено, активируем срабатывания уведомления об обязательном поле
      this.showError = true;
      this.putButtonDowner = true;
    } else {
      //Таким образом, когда все поля будут заполнены корректно, флаг showError будет сброшен на false, и сообщение "Обязательное поле" перестанет отображаться.
      this.showError = false;
      //для открытие всплывающего окна
      this.dialog.open(AlertsReviewComponent);
      // отвечает за создаем пост и отправку его на бекенд
      this.reviewsServices.createReview(review).subscribe(() => {
        this.form.reset();
        console.log('click')
      })
    }
  }
}
