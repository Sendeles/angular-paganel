import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SliderComponent} from "../../shared/components/slider/slider.component";
import {LanguageServices} from "../../shared/services/language.services";

@Component({
  selector: 'app-about-us-page',
  standalone: true,
  imports: [CommonModule, SliderComponent],
  templateUrl: './about-us-page.component.html',
  styleUrl: './about-us-page.component.scss'
})
export class AboutUsPageComponent {

  constructor(
    public languageService: LanguageServices
  ) {
  }

  images = [
    {
      imgSrc: 'assets/images/slider/picture_slider_1.jpg',
      imgAlt: 'picture slider 1',
    },
    {
      imgSrc: 'assets/images/slider/picture_slider_2.jpg',
      imgAlt: 'picture slider 2',
    },
    {
      imgSrc: 'assets/images/slider/picture_slider_3.png',
      imgAlt: 'picture slider 3',
    },
    {
      imgSrc: 'assets/images/slider/picture_slider_4.jpg',
      imgAlt: 'picture slider 4',
    },
    {
      imgSrc: 'assets/images/slider/picture_slider_5.jpg',
      imgAlt: 'picture slider 5',
    },
    {
      imgSrc: 'assets/images/slider/picture_slider_6.jpg',
      imgAlt: 'picture slider 6',
    },
  ]

}
