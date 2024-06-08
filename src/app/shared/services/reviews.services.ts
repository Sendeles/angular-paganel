import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IFireBaseCreateResponse, IReview} from "../../../environments/environments";
import {Observable} from "rxjs";
import {environment} from "../../../environments/interface";
import {IPagelink} from "../constants/pagelink";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class ReviewsServices {

  constructor(
    private http: HttpClient
  ) {
  }

  //отправка на бекенд
  createReview(review: IReview): Observable<IReview> { // Это объявление метода createReview, который принимает объект review типа IReview в качестве параметра и возвращает объект Observable, который будет излучать данные типа IReview.
    return this.http.post<IReview>(`${environment.firebaseConfig.databaseURL}${IPagelink.REVIEW_PAGE}.json`, review)
      .pipe(
        tap(data => console.log('Create Review', data)),
        map((response: IFireBaseCreateResponse) => {
          return {
            ...review,
            id: response.name,
            date: review.date ? new Date(review.date) : null
          }
        })
      )
  }

  createReviewById(review: IReview, id: string): Observable<IReview> { // Это объявление метода createReview, который принимает объект review типа IReview в качестве параметра и возвращает объект Observable, который будет излучать данные типа IReview.
    return this.http.post<IReview>(`${environment.firebaseConfig.databaseURL}${IPagelink.REVIEW_PAGE}/${id}.json`, review)
      .pipe(
        tap(data => console.log('Create Review', data)),
        map((response: IFireBaseCreateResponse) => {
          return {
            ...review,
            id: response.name,
            date: review.date ? new Date(review.date) : null
          }
        })
      )
  }

  //Получение всех постов что у нас есть на бекэнде
  getAll(): Observable<IReview[]> {
    return this.http.get(`${environment.firebaseConfig.databaseURL}${IPagelink.REVIEW_PAGE}.json`)
      .pipe(
        //вывожу все посты в консоль через tap
        tap(data => console.log('getAll', data)),
        // преобразует объект ответа в массив постов.  review1: { author: "1", content: "<p>1</p>", date: "2023-11-15T21:08:14.454Z", title: "1" }, review2: { author: "2", content: "<p>2</p>", date: "2023-11-15T21:08:14.454Z", title: "2" }
        map((response: { [key: string]: any }) => {
          //проверка if (!response) перед обработкой данных. Если response равен null или undefined, то возвращается пустой массив. Это поможет избежать ошибки, связанной с чтением свойства date у null.
          if (!response) {
            return [];
          }
          //распарсиваем объект
          return Object
            //массив айдишников, то есть каждый объ`ект становится массивом. Object.keys(response) берет все ключи из объекта response. В вашем случае, это будут ['review1', 'review2'].
            .keys(response)
            //преобразовать каждый ключ в новый объект, (смотри дальше =>)
            .map((key) => ({
              // просто в { author: "1", content: "<p>1</p>", date: "2023-11-15T21:08:14.454Z", title: "1" }, уже без  "review1:" то есть как будто делаем безымянным, тоже самое с review2
              ...response[key],
              // Добавляем ключ в качестве свойства id, каждый объект получает дополнительно id: "review1" получается:{ author: "1", content: "1", title: "1", date: "2021-01-01T00:00:00.000Z", id: "review1" (и вот добавилось свойство id)}, тоже самое с review2, если бы не было id: key было бы просто { author: "1", content: "<p>1</p>", date: "2023-11-15T21:08:14.454Z", title: "1" }
              id: key,
              // Преобразуем строку даты в объект Date  date: [object Date], вместо date: "2021-01-01T00:00:00.000Z"
              date: response[key]?.date ? new Date(response[key]?.date) : false
        }))
        }))
  }

  //Получение всех постов что у нас есть на бекэнде
  getAllById(id: string): Observable<IReview[]> {
    return this.http.get(`${environment.firebaseConfig.databaseURL}${IPagelink.REVIEW_PAGE}/${id}.json`)
      .pipe(
        //вывожу все посты в консоль через tap
        tap(data => console.log('getAll', data)),
        // преобразует объект ответа в массив постов.  review1: { author: "1", content: "<p>1</p>", date: "2023-11-15T21:08:14.454Z", title: "1" }, review2: { author: "2", content: "<p>2</p>", date: "2023-11-15T21:08:14.454Z", title: "2" }
        map((response: { [key: string]: any }) => {
          //проверка if (!response) перед обработкой данных. Если response равен null или undefined, то возвращается пустой массив. Это поможет избежать ошибки, связанной с чтением свойства date у null.
          if (!response) {
            return [];
          }
          //распарсиваем объект
          return Object
            //массив айдишников, то есть каждый объ`ект становится массивом. Object.keys(response) берет все ключи из объекта response. В вашем случае, это будут ['review1', 'review2'].
            .keys(response)
            //преобразовать каждый ключ в новый объект, (смотри дальше =>)
            .map((key) => ({
              // просто в { author: "1", content: "<p>1</p>", date: "2023-11-15T21:08:14.454Z", title: "1" }, уже без  "review1:" то есть как будто делаем безымянным, тоже самое с review2
              ...response[key],
              // Добавляем ключ в качестве свойства id, каждый объект получает дополнительно id: "review1" получается:{ author: "1", content: "1", title: "1", date: "2021-01-01T00:00:00.000Z", id: "review1" (и вот добавилось свойство id)}, тоже самое с review2, если бы не было id: key было бы просто { author: "1", content: "<p>1</p>", date: "2023-11-15T21:08:14.454Z", title: "1" }
              id: key,
              // Преобразуем строку даты в объект Date  date: [object Date], вместо date: "2021-01-01T00:00:00.000Z"
              date: new Date(response[key]?.date)
            }))
        }))
  }

  getByID(id: string): Observable<IReview> {
    return this.http.get<IReview>(`${environment.firebaseConfig.databaseURL}${IPagelink.REVIEW_PAGE}/${id}.json`)
      .pipe(
        tap(data => console.log('getByID', data)),
        map((review: IReview) => {
          const transformedReview = {
            //Вставляем данные поста, В этом коде ...review - это оператор расширения (spread operator), который используется для копирования всех свойств из объекта review. Это означает, что все свойства, которые есть в объекте review, будут скопированы в новый объект transformedReview.
            ...review,
            //Свойство id получает значение, которое было передано в функцию getByID, а свойство date преобразуется в объект Date из строки, которая была получена из объекта review. Свойство id берется из аргумента функции getByID, а новое свойство date создается из строки даты, которая была получена из объекта review.
            id,
            date: review.date ? new Date(review.date) : null
          };
          console.log('GetByID After map:', transformedReview);
          return transformedReview;
        }))
  }

  //Метод удаления с самого бэкенда
  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.firebaseConfig.databaseURL}${IPagelink.REVIEW_PAGE}/${id}.json`)
  }

  //Метод обновления поста на бекенд
  update(review: IReview): Observable<IReview> {
    return this.http.patch<IReview>(`${environment.firebaseConfig.databaseURL}${IPagelink.REVIEW_PAGE}/${review.id}.json`, review)
  }
}
