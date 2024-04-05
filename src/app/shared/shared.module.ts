import {NgModule} from "@angular/core";
import {SearchPipe} from "./pipes/search.pipe";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    SearchPipe
  ],
  imports: [
  ],
  exports: [
    SearchPipe
  ]
})

export class SharedModule {

}
