import {NgModule} from "@angular/core";
import {SearchPipe} from "./pipes/search.pipe";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    SearchPipe
  ],
  imports: [
    MatDialogModule // для открытие модального окна например при нажатии кнопки оставить отзыв в компоненте reviews-page
  ],
  exports: [
    SearchPipe
  ]
})

export class SharedModule {

}
