import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostServices} from "../../../shared/services/post.services";
import {Subscription} from "rxjs";
import {IPost} from "../../../../environments/environments";
import {FormsModule} from "@angular/forms";
import {CommonModule, DatePipe} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    FormsModule, //для ngModule который я использую в dashboard-page.html
    DatePipe, // для встроенной pipe date в html которую я віделил !!! <td>{{post.date | !!!date:!!! 'dd.MM.yyyy, HH:mm:ss':'ua'}}</td>
    CommonModule, // для *ngIf, *ngFor, [ngClass], [ngStyle] и другие
    SharedModule // импортируем его потому что в нем находится SearchPipe который нам здесь нужен
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: IPost[] = []; // добовляя = [] мы инициализируем posts пустым массивом в компоненте, Angular будет гарантировать, что он никогда не будет undefined, и ошибка не возникнет.
  pSub?: Subscription; //pSub является опциональной переменной типа Subscription. В Angular и других фреймворках, основанных на RxJS, объект Subscription используется для управления подписками на потоки данных, особенно в контексте асинхронных операций, таких как запросы к серверу или обновления UI на основе изменений данных.
  rSub?: Subscription;
  searchPost = '';

  constructor(
    private postServices: PostServices,
  ) {
  }

  ngOnInit() {
    //получаю посты от getAll
    this.pSub = this.postServices.getAll().subscribe(posts => {
      //присваиваю переменной пост(массиву) тот респонс который приходит
      this.posts = posts
      console.log('this.posts', this.posts)
    })
  }

  //удаляю конкретный пост
  remove(id: string) {
    this.rSub = this.postServices.remove(id).subscribe(() => {
      //проверяем не является ли this.posts undefined и если нет, перебираем список постов после удаления какого-то поста
      if (this.posts) {
        this.posts = this.posts.filter((post) => post.id !== id);
      }
      // this.alertServices.delete('Пост был удален')
    })
  }

  ngOnDestroy() {
    //отписка для того что бы не было утечек памяти
    if (this.pSub) {
      this.pSub.unsubscribe()
    }

    if (this.rSub) {
      this.rSub.unsubscribe()
    }
  }
}
