import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IFireBaseCreateResponse, IPost} from "../../../environments/environments";
import {Observable} from "rxjs";
import {environment} from "../../../environments/interface";
import {IPagelink} from "../constants/pagelink";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class PostServices {

  constructor(
    private http: HttpClient
  ) {
  }

  //отправка на бекенд
  createPost(post: IPost): Observable<IPost> { // Это объявление метода createPost, который принимает объект post типа IPost в качестве параметра и возвращает объект Observable, который будет излучать данные типа IPost.
    return this.http.post<IPost>(`${environment.firebaseConfig.databaseURL}${IPagelink.POST_PAGE}.json`, post)
      .pipe(
        tap(data => console.log('Create Post', data)),
        map((response: IFireBaseCreateResponse) => {
          return {
            ...post,
            id: response.name,
            date: post.date ? new Date(post.date) : null
          }
        })
      )
  }

  createPostById(post: IPost, id: string): Observable<IPost> { // Это объявление метода createPost, который принимает объект post типа IPost в качестве параметра и возвращает объект Observable, который будет излучать данные типа IPost.
    return this.http.post<IPost>(`${environment.firebaseConfig.databaseURL}${IPagelink.POST_PAGE}/${id}.json`, post)
      .pipe(
        tap(data => console.log('Create Post', data)),
        map((response: IFireBaseCreateResponse) => {
          return {
            ...post,
            id: response.name,
            date: post.date ? new Date(post.date) : null
          }
        })
      )
  }

  //Получение всех постов что у нас есть на бекэнде
  getAll(): Observable<IPost[]> {
    return this.http.get(`${environment.firebaseConfig.databaseURL}${IPagelink.POST_PAGE}.json`)
      .pipe(
        //вывожу все посты в консоль через tap
        tap(data => console.log('getAll', data)),
        // преобразует объект ответа в массив постов.  post1: { author: "1", content: "<p>1</p>", date: "2023-11-15T21:08:14.454Z", title: "1" }, post2: { author: "2", content: "<p>2</p>", date: "2023-11-15T21:08:14.454Z", title: "2" }
        map((response: { [key: string]: any }) => {
          //проверка if (!response) перед обработкой данных. Если response равен null или undefined, то возвращается пустой массив. Это поможет избежать ошибки, связанной с чтением свойства date у null.
          if (!response) {
            return [];
          }
          //распарсиваем объект
          return Object
            //массив айдишников, то есть каждый объ`ект становится массивом. Object.keys(response) берет все ключи из объекта response. В вашем случае, это будут ['post1', 'post2'].
            .keys(response)
            //преобразовать каждый ключ в новый объект, (смотри дальше =>)
            .map((key) => ({
              // просто в { author: "1", content: "<p>1</p>", date: "2023-11-15T21:08:14.454Z", title: "1" }, уже без  "post1:" то есть как будто делаем безымянным, тоже самое с post2
              ...response[key],
              // Добавляем ключ в качестве свойства id, каждый объект получает дополнительно id: "post1" получается:{ author: "1", content: "1", title: "1", date: "2021-01-01T00:00:00.000Z", id: "post1" (и вот добавилось свойство id)}, тоже самое с post2, если бы не было id: key было бы просто { author: "1", content: "<p>1</p>", date: "2023-11-15T21:08:14.454Z", title: "1" }
              id: key,
              // Преобразуем строку даты в объект Date  date: [object Date], вместо date: "2021-01-01T00:00:00.000Z"
              date: response[key]?.date ? new Date(response[key]?.date) : false
        }))
        }))
  }

  //Получение всех постов что у нас есть на бекэнде
  getAllById(id: string): Observable<IPost[]> {
    return this.http.get(`${environment.firebaseConfig.databaseURL}${IPagelink.POST_PAGE}/${id}.json`)
      .pipe(
        //вывожу все посты в консоль через tap
        tap(data => console.log('getAll', data)),
        // преобразует объект ответа в массив постов.  post1: { author: "1", content: "<p>1</p>", date: "2023-11-15T21:08:14.454Z", title: "1" }, post2: { author: "2", content: "<p>2</p>", date: "2023-11-15T21:08:14.454Z", title: "2" }
        map((response: { [key: string]: any }) => {
          //проверка if (!response) перед обработкой данных. Если response равен null или undefined, то возвращается пустой массив. Это поможет избежать ошибки, связанной с чтением свойства date у null.
          if (!response) {
            return [];
          }
          //распарсиваем объект
          return Object
            //массив айдишников, то есть каждый объ`ект становится массивом. Object.keys(response) берет все ключи из объекта response. В вашем случае, это будут ['post1', 'post2'].
            .keys(response)
            //преобразовать каждый ключ в новый объект, (смотри дальше =>)
            .map((key) => ({
              // просто в { author: "1", content: "<p>1</p>", date: "2023-11-15T21:08:14.454Z", title: "1" }, уже без  "post1:" то есть как будто делаем безымянным, тоже самое с post2
              ...response[key],
              // Добавляем ключ в качестве свойства id, каждый объект получает дополнительно id: "post1" получается:{ author: "1", content: "1", title: "1", date: "2021-01-01T00:00:00.000Z", id: "post1" (и вот добавилось свойство id)}, тоже самое с post2, если бы не было id: key было бы просто { author: "1", content: "<p>1</p>", date: "2023-11-15T21:08:14.454Z", title: "1" }
              id: key,
              // Преобразуем строку даты в объект Date  date: [object Date], вместо date: "2021-01-01T00:00:00.000Z"
              date: new Date(response[key]?.date)
            }))
        }))
  }

  getByID(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${environment.firebaseConfig.databaseURL}${IPagelink.POST_PAGE}/${id}.json`)
      .pipe(
        tap(data => console.log('getByID', data)),
        map((post: IPost) => {
          const transformedPost = {
            //Вставляем данные поста, В этом коде ...post - это оператор расширения (spread operator), который используется для копирования всех свойств из объекта post. Это означает, что все свойства, которые есть в объекте post, будут скопированы в новый объект transformedPost.
            ...post,
            //Свойство id получает значение, которое было передано в функцию getByID, а свойство date преобразуется в объект Date из строки, которая была получена из объекта post. Свойство id берется из аргумента функции getByID, а новое свойство date создается из строки даты, которая была получена из объекта post.
            id,
            date: post.date ? new Date(post.date) : null
          };
          console.log('GetByID After map:', transformedPost);
          return transformedPost;
        }))
  }

  //Метод удаления с самого бэкенда
  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.firebaseConfig.databaseURL}${IPagelink.POST_PAGE}/${id}.json`)
  }

  //Метод обновления поста на бекенд
  update(post: IPost): Observable<IPost> {
    return this.http.patch<IPost>(`${environment.firebaseConfig.databaseURL}${IPagelink.POST_PAGE}/${post.id}.json`, post)
  }
}
