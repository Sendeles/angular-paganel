import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, FormsModule, Validators} from "@angular/forms";
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

  constructor(
    public reviewsServices: ReviewsServices,
    public dialogRef: MatDialogRef<CountrySelectionComponent>,
    //Ипортируем названия стран которые будут выпадать в модальном окне, @Inject, чтобы внедрить данные, которые передаются в модальное окно при его открытии. указывает, что data включает два свойства: 1) travels: массив объектов { name: string, id: string } 2) review: объект IReview.
    @Inject(MAT_DIALOG_DATA) public data: { travels: { name: string, id: string }[], review: IReview}
  ) {
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    //создаем отзыв (объект this.data.review) в конкретно выбранной стране this.selectedCountry (он понимает какой id страны приписывать благодаря ngModel)
    this.reviewsServices.createReviewById(this.data.review, this.selectedCountry).subscribe(() => {
    })
    this.dialogRef.close(this.data.review.id);
    console.log('this.data.review.id', this.data.review.id)
    console.log('huna', this.data)
    console.log('this.selectedCountry', this.selectedCountry)
  }
}
