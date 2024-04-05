import {Pipe, PipeTransform} from "@angular/core";
import {IPost} from "../../../environments/environments";

@Pipe({
  name: 'searchPosts' //данное имя я буду использовать для импортировки SearchPipe
})

export class SearchPipe implements PipeTransform {

  //Метод transform в качесвте входящего параметра массив posts типа IPots массив и вторым параметром буду получать некоторый search поу молчанию это будет пустая строка и возвращать я буду именно массив IPost[]
  transform(posts: IPost[], search = ''): IPost[] {
    //trim удаляет все лишине пробелы,то есть если строка пустая то я возвращаю просто массив постов, если не пустая фильтрую массив пост, на каждой операции получаю объект поста, фильтрую по тайтлу
    if (!search.trim()) {
      return posts
    } else {
      //прописываем по каким елементам будет работать поиск
      return posts.filter(post => {
        return post.expedition.toLowerCase().includes(search.toLowerCase()) ||
          post.name.toLowerCase().includes(search.toLowerCase())
      })
    }
  }
}
