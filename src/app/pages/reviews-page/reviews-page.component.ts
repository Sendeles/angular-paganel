import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {StarsRatingComponent} from "../../shared/components/stars-rating/stars-rating.component";
import {LanguageServices} from "../../shared/services/language.services";
import {RouterModule} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ReviewsServices} from "../../shared/services/reviews.services";
import {IReview} from "../../../environments/environments";
import {AlertsServices} from "../../shared/services/alerts.services";
import {MatDialog} from "@angular/material/dialog";
import {AlertsReviewComponent} from "../../shared/components/alerts-review/alerts-review.component";
import {TravelsService} from "../../shared/services/travels.services";
import {ITravels} from "../../shared/models/travels/travels.model";

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    CommonModule,
    StarsRatingComponent,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reviews-page.component.html',
  styleUrl: './reviews-page.component.scss'
})
export class ReviewsPageComponent {

  travels: ITravels[]; //задаем типизацию, иначе не хочет компонент брать TravelsService как массив

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
    private travelsService: TravelsService, // Добавляем зависимость TravelsService
    private reviewsServices: ReviewsServices,
    private alertServ: AlertsServices,
    private dialog: MatDialog // требуется для открытие модального окна
  ) {
    this.travels = this.travelsService.getTravels(); // Чтобы компонент знал, какие путешествия нужно отображать, необходимо инициализировать это свойство данными. Метод getTravels из сервиса TravelsService возвращает массив путешествий, который используется для этой цели.
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

    //для открытие всплывающего окна
    this.dialog.open(AlertsReviewComponent);


    // при нажатии на кнопку создаем пост
    this.reviewsServices.createReview(review).subscribe(() => {
      this.form.reset();
      // this.alertServ.success(
      //   // задаем фонт сайз легвидж сервису в ТСках
      //   `<span style="font-size: 50px;">${this.languageService.getTranslate('THANKS_FOR_REVIEW')}</span>
      //         <span style="font-size: 15px;">${this.languageService.getTranslate('THANKS_FOR_REVIEW_2')}</span>`
      // );
      // });
      console.log('click')
    })
  }
}
