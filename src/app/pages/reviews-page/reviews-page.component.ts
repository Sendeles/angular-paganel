import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {StarsRatingComponent} from "../../shared/components/stars-rating/stars-rating.component";
import {LanguageServices} from "../../shared/services/language.services";
import {RouterModule} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PostServices} from "../../shared/services/post.services";
import {IPost} from "../../../environments/environments";
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

  // travels = [
  //   {name: 'Antarctica', id: 'antarctica', image: './assets/images/travels/antarctica.webp', reviewsLink: '#'},
  //   {name: 'Zimbabwe', id: 'zimbabwe', image: './assets/images/travels/zimbabwe.webp', reviewsLink: '#'},
  //   {name: 'Socotra', id: 'socotra', image: './assets/images/travels/socotra.webp', reviewsLink: '#'},
  //   {name: 'Mexico', id: 'mexico', image: './assets/images/travels/mexico.webp', reviewsLink: '#'},
  //   {name: 'Tierra Del Fuega', id: 'tierra-del-fuega', image: './assets/images/travels/tierraDelFuega.webp', reviewsLink: '#'},
  //   {name: 'Indonesia', id: 'indonesia', image: './assets/images/travels/indonesia.webp', reviewsLink: '#'},
  //   {name: 'Bolivia', id: 'bolivia', image: './assets/images/travels/bolivia.webp', reviewsLink: '#'},
  //   {name: 'Australia', id: 'australia', image: './assets/images/travels/australia.webp', reviewsLink: '#'}
  // ]


  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    expedition: new FormControl('', Validators.required),
    social: new FormControl('', Validators.required),
    review: new FormControl('', Validators.required),
    date: new FormControl(new Date())
  });


  constructor(
    public languageService: LanguageServices,
    private travelsService: TravelsService, // Добавляем зависимость TravelsService
    private postService: PostServices,
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
    const post: IPost = {
      name: this.form.value.name,
      surname: this.form.value.surname,
      expedition: this.form.value.expedition,
      social: this.form.value.social,
      review: this.form.value.review,
      date: new Date()
    }

    //для открытие всплывающего окна
    this.dialog.open(AlertsReviewComponent);


    // при нажатии на кнопку создаем пост
    this.postService.createPost(post).subscribe(() => {
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
