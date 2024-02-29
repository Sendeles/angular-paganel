import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { REVIEWS } from '../data/reviews-data';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ReviewsService {

  //Если я хочу сам вносить данные вручную в файл и уже оттуда брать отзывы,принимает один параметр id типа string. Этот параметр предназначен для идентификации конкретного набора отзывов в объекте REVIEWS из reviews-data.ts по ключу.
  getReviews(id: string) {
    return (REVIEWS as any)[id] || [];
  }
}
