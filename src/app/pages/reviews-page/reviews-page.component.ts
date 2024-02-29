import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {StarsRatingComponent} from "../../shared/components/stars-rating/stars-rating.component";
import {LanguageServices} from "../../shared/services/language.services";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, StarsRatingComponent, RouterModule],
  templateUrl: './reviews-page.component.html',
  styleUrl: './reviews-page.component.scss'
})
export class ReviewsPageComponent {

  travels = [
    { name: 'Antarctica', id: 'antarctica', image: './assets/images/travels/antarctica.webp', reviewsLink: '#' },
    { name: 'Zimbabwe', id: 'zimbabwe', image: './assets/images/travels/zimbabwe.webp', reviewsLink: '#' },
    { name: 'Socotra', id: 'socotra', image: './assets/images/travels/socotra.webp', reviewsLink: '#' },
    { name: 'Mexico', id: 'mexico', image: './assets/images/travels/mexico.webp', reviewsLink: '#' },
    { name: 'Tierra Del Fuega', id: 'tierra-del-fuega', image: './assets/images/travels/tierraDelFuega.webp', reviewsLink: '#' },
    { name: 'Indonesia', id: 'indonesia', image: './assets/images/travels/indonesia.webp', reviewsLink: '#' },
    { name: 'Bolivia', id: 'bolivia', image: './assets/images/travels/bolivia.webp', reviewsLink: '#' },
    { name: 'Australia', id: 'australia', image: './assets/images/travels/australia.webp', reviewsLink: '#' }
]

  constructor(
    public languageService: LanguageServices
  ) {
  }

  onSubmit() {
    console.log('click')
  }

}
