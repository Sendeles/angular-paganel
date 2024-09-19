import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SliderPersonalComponent} from "../../slider-personal/slider-personal.component";
import {ISlide} from "../../../models/slider/slider.model";
import {LanguageServices} from "../../../services/language.services";

@Component({
  selector: 'app-andrii-andreiev-page',
  standalone: true,
  imports: [
    CommonModule,
    SliderPersonalComponent
  ],
  templateUrl: './andrii-andreiev-page.component.html',
  styleUrl: './andrii-andreiev-page.component.scss'
})
export class AndriiAndreievPageComponent {

  andrii_and_sign: string = './assets/images/signatures/andrii_and_sign.webp';
  facebook_2: string = './assets/images/social/facebook_2.webp';

  constructor(
    public languageService: LanguageServices
  ) {
  }

  imagesR = [
    'assets/images/slider/picture_slider_1.jpg',
    'assets/images/slider/picture_slider_2.jpg',
    'assets/images/slider/picture_slider_3.png',
    'assets/images/slider/picture_slider_4.jpg',
    'assets/images/slider/picture_slider_5.jpg',
    'assets/images/slider/picture_slider_6.jpg'
  ]
}

