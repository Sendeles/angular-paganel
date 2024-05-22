import { Component } from '@angular/core';
import {MatDialogContent, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {LanguageServices} from "../../services/language.services";

@Component({
  selector: 'app-alerts-review',
  standalone: true,
  imports: [
    MatDialogModule, // все 3 ммодуля нужны для открытие модального окна например при нажатии кнопки оставить отзыв в компоненте reviews-page
    MatButtonModule, // все 3 ммодуля нужны для открытие модального окна например при нажатии кнопки оставить отзыв в компоненте reviews-page
    MatDialogContent // все 3 ммодуля нужны для открытие модального окна например при нажатии кнопки оставить отзыв в компоненте reviews-page
  ],
  templateUrl: './alerts-review.component.html',
  styleUrl: './alerts-review.component.scss'
})
export class AlertsReviewComponent {

  constructor(
    public languageService: LanguageServices,
    public dialogRef: MatDialogRef<AlertsReviewComponent> // требуется для работы закрытия всплывающего окна при нажатии на крестик
  ) {
  }

  //функция для закрытия окна
  closeModal() {
    this.dialogRef.close();
    console.log('click')
  }
}
