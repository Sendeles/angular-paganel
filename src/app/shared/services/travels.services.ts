import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TravelsService {

  travels = [
    {name: 'Antarctica', id: 'antarctica', image: './assets/images/travels/antarctica.webp', reviewsLink: '#'},
    {name: 'Zimbabwe', id: 'zimbabwe', image: './assets/images/travels/zimbabwe.webp', reviewsLink: '#'},
    {name: 'Socotra', id: 'socotra', image: './assets/images/travels/socotra.webp', reviewsLink: '#'},
    {name: 'Mexico', id: 'mexico', image: './assets/images/travels/mexico.webp', reviewsLink: '#'},
    {
      name: 'Tierra Del Fuega',
      id: 'tierra-del-fuega',
      image: './assets/images/travels/tierraDelFuega.webp',
      reviewsLink: '#'
    },
    {name: 'Indonesia', id: 'indonesia', image: './assets/images/travels/indonesia.webp', reviewsLink: '#'},
    {name: 'Bolivia', id: 'bolivia', image: './assets/images/travels/bolivia.webp', reviewsLink: '#'},
    {name: 'Australia', id: 'australia', image: './assets/images/travels/australia.webp', reviewsLink: '#'}
  ]

  getTravels() {
    return this.travels;
  }
}
