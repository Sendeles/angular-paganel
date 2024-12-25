import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ArraysService {

  travels = [
    {name: 'Antarctica', id: 'antarctica', image: './assets/images/travels/antarctica.webp', reviewsLink: '#'},
    {name: 'Zimbabwe', id: 'zimbabwe', image: './assets/images/travels/zimbabwe.webp', reviewsLink: '#'},
    {name: 'Socotra', id: 'socotra', image: './assets/images/travels/socotra.webp', reviewsLink: '#'},
    {name: 'Peru and Bolivia', id: 'peru-and-bolivia', image: './assets/images/travels/peruAndBolivia.webp', reviewsLink: '#'},
    {name: 'Mexico', id: 'mexico', image: './assets/images/travels/mexico.webp', reviewsLink: '#'},
    {name: 'Tierra Del Fuega', id: 'tierra-del-fuega', image: './assets/images/travels/tierraDelFuega.webp', reviewsLink: '#'},
    {name: 'Indonesia', id: 'indonesia', image: './assets/images/travels/indonesia.webp', reviewsLink: '#'},
    {name: 'Bolivia', id: 'bolivia', image: './assets/images/travels/bolivia.webp', reviewsLink: '#'},
    {name: 'Australia', id: 'australia', image: './assets/images/travels/australia.webp', reviewsLink: '#'},
    {name: 'Patagonia', id: 'patagonia', image: './assets/images/travels/patagonia.webp', reviewsLink: '#'},
    {name: 'Аconcagua', id: 'aconcagua', image: './assets/images/travels/aconcagua.webp', reviewsLink: '#'},
    {name: 'Algeria', id: 'algeria', image: './assets/images/travels/algeria.webp', reviewsLink: '#'},
    {name: 'Iceland', id: 'iceland', image: './assets/images/travels/iceland.webp', reviewsLink: '#'},
    {name: 'Namibia', id: 'namibia', image: './assets/images/travels/namibia.webp', reviewsLink: '#'},
    {name: 'Japan', id: 'japan', image: './assets/images/travels/japan.webp', reviewsLink: '#'}
  ]

  getTravels() {
    return this.travels;
  }

  favorites = [
    {chose: 'Yes', id: 'reviewSlider'},
    {chose: 'No', id: 'noAddToReviewSlider'}
  ]

  getFavorites() {
    return this.favorites
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

  getImagesAndriiAnd() {
    return this.imagesAndriiAnd
  }
}
