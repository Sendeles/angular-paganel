import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {IReview} from "../../../../environments/environments";
import {ReviewsServices} from "../../services/reviews.services";

@Component({
  selector: 'app-country-selection',
  standalone: true,
  imports: [
    CommonModule, // для *ngFor
    FormsModule, // для работы модального онка и ngModel
    MatDialogModule, // для работы модального онка
    MatFormFieldModule, // для работы модального онка
    MatSelectModule // для работы модального онка
  ],
  templateUrl: './country-selection.component.html',
  styleUrl: './country-selection.component.scss'
})
export class CountrySelectionComponent {

  selectedCountry: string = ''; //исходное значение, пустая строка
  addToFavorite: string = '';

  constructor(
    public reviewsServices: ReviewsServices,
    public dialogRef: MatDialogRef<CountrySelectionComponent>,
    //Ипортируем названия стран, их айди, варианты выбора которые будут выпадать в модальном окне из компонента DashboardPageComponent, @Inject, чтобы внедрить данные, которые передаются в модальное окно при его открытии. указывает, что data включает два свойства: 1) travels: массив объектов { name: string, id: string } 2) favorites: массив объектов { chose: string } 3) review: объект IReview.
    @Inject(MAT_DIALOG_DATA) public data: { travels: { name: string, id: string }[], favorites: { chose: string, id: string }[], review: IReview}
  ) {
    console.log('huna', this.data)
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.addToFavorite === 'reviewSlider') {
      this.reviewsServices.createReviewById(this.data.review, this.addToFavorite).subscribe(
        (review) => {
          console.log('Отзыв создан успешно:', review);
          // Здесь вы можете выполнить дополнительные действия после создания отзыва
        },
        (error) => {
          console.error('Ошибка при создании отзыва:', error);
          // Здесь вы можете обработать ошибку, если она произошла
        }
      );
    }

    //создаем отзыв (объект this.data.review) в конкретно выбранной стране this.selectedCountry (он понимает какой id страны приписывать благодаря ngModel)
    this.reviewsServices.createReviewById(this.data.review, this.selectedCountry).subscribe(() => {

    })
    //закрываем модал диалог
    this.dialogRef.close(this.data.review.id);
    console.log('this.addToFavorite', this.addToFavorite)
    console.log('this.addToFavorite.id', this.data.favorites),
    console.log('this.data.review', this.data.review)
    console.log('this.data.review.id', this.data.review.id)
    console.log('huna', this.data)
    console.log('this.selectedCountry', this.selectedCountry)
  }
}
