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

  imagesOlgaAnd = [
    'assets/images/personal/olga-and/slider/olga-and-slider-1.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-2.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-3.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-4.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-5.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-6.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-7.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-8.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-9.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-10.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-11.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-12.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-13.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-14.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-15.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-16.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-17.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-18.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-19.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-20.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-21.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-22.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-23.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-24.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-25.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-26.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-27.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-28.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-29.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-30.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-31.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-32.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-33.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-34.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-35.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-36.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-37.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-38.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-39.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-40.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-41.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-42.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-43.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-44.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-45.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-46.jpg',
    'assets/images/personal/olga-and/slider/olga-and-slider-47.jpg',
  ]

  getImagesOlgaAnd() {
    return this.imagesOlgaAnd
  }
}
