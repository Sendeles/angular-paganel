import {Injectable} from "@angular/core";
import {REVIEWS} from '../data/reviews-data';
import {IReviews} from "../models/reviews/reviews.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ReviewsService {

  //Если я хочу сам вносить данные вручную в файл и уже оттуда брать отзывы,принимает один параметр id типа string. Этот параметр предназначен для идентификации конкретного набора отзывов в объекте REVIEWS из reviews-data.ts по ключу.
  getReviews(id: string): Observable<IReviews[]> {
    //id это antarctica, zimbabwe и тд. из review-data.ts, если же такого айди нет, то просто выводит пустой массив
    return of(REVIEWS[id] || []);
  }
}
