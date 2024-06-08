import {Pipe, PipeTransform} from "@angular/core";
import {IReview} from "../../../environments/environments";

@Pipe({
  name: 'searchReviews' //данное имя я буду использовать для импортировки SearchPipe
})

export class SearchPipe implements PipeTransform {

  //Метод transform в качесвте входящего параметра массив reviews типа IPots массив и вторым параметром буду получать некоторый search поу молчанию это будет пустая строка и возвращать я буду именно массив IReview[]
  transform(reviews: IReview[], search = ''): IReview[] {
    //trim удаляет все лишине пробелы,то есть если строка пустая то я возвращаю просто массив постов, если не пустая фильтрую массив пост, на каждой операции получаю объект поста, фильтрую по тайтлу
    console.log('Search term:', search);
    console.log('Reviews:', reviews);
    if (!search.trim()) {
      return reviews
    } else {
      //прописываем по каким елементам будет работать поиск
      return reviews.filter(review => {
        return review.expedition.toLowerCase().includes(search.toLowerCase()) ||
          review.name.toLowerCase().includes(search.toLowerCase())
      })
    }
  }
}
