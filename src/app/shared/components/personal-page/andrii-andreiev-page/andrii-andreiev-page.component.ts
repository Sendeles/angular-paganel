import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SliderPersonalComponent} from "../../slider-personal/slider-personal.component";
import {ISlide} from "../../../models/slider/slider.model";
import {LanguageServices} from "../../../services/language.services";
import {RouterModule} from "@angular/router";
import {ISocialLink} from "../../../constants/sociallink";

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

  socialLink = ISocialLink;
  andrii_and_sign: string = './assets/images/signatures/andrii_and_sign.webp';
  facebook_2: string = './assets/images/social/facebook_2.webp';
  andrii_tongue: string = './assets/images/personal/andrii-and/andrii_tongue.webp';

  constructor(
    public languageService: LanguageServices
  ) {
  }

  imagesAndriiAnd = [
    'assets/images/personal/andrii-and/slider/andrii-and-slider-1.webp',
    'assets/images/personal/andrii-and/slider/andrii-and-slider-2.webp',
    'assets/images/personal/andrii-and/slider/andrii-and-slider-3.webp',
    'assets/images/personal/andrii-and/slider/andrii-and-slider-4.webp',
    'assets/images/personal/andrii-and/slider/andrii-and-slider-5.webp',
    'assets/images/personal/andrii-and/slider/andrii-and-slider-6.webp',
    'assets/images/personal/andrii-and/slider/andrii-and-slider-7.webp',
    'assets/images/personal/andrii-and/slider/andrii-and-slider-8.webp',
    'assets/images/personal/andrii-and/slider/andrii-and-slider-10.webp',
    'assets/images/personal/andrii-and/slider/andrii-and-slider-11.webp',
    'assets/images/personal/andrii-and/slider/andrii-and-slider-12.webp',
    'assets/images/personal/andrii-and/slider/andrii-and-slider-13.webp',
    'assets/images/personal/andrii-and/slider/andrii-and-slider-14.webp',
    'assets/images/personal/andrii-and/slider/andrii-and-slider-15.webp',
    'assets/images/personal/andrii-and/slider/andrii-and-slider-16.webp',
    'assets/images/personal/andrii-and/slider/andrii-and-slider-17.webp',
    'assets/images/personal/andrii-and/slider/andrii-and-slider-18.webp',
    'assets/images/personal/andrii-and/slider/andrii-and-slider-19.webp',
  ]
}

