import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-about-us-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us-page.component.html',
  styleUrl: './about-us-page.component.scss'
})
export class AboutUsPageComponent {

  enableClass = false

  disableClass() {
    return {'mat-typography': this.enableClass}
  }

}
