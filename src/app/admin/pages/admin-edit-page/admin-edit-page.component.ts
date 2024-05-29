import {Component, OnInit} from '@angular/core';
import {Subscription, switchMap} from "rxjs";
import {IPost} from "../../../../environments/environments";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PostServices} from "../../../shared/services/post.services";
import {AlertsServices} from "../../../shared/services/alerts.services";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-admin-edit-page',
  standalone: true,
  imports: [
    CommonModule, // для правильной работы *ngIf
    ReactiveFormsModule // для работы [formGroup]="form"
  ],
  templateUrl: './admin-edit-page.component.html',
  styleUrl: './admin-edit-page.component.scss'
})

export class AdminEditPageComponent implements OnInit {


  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    expedition: new FormControl('', Validators.required),
    social: new FormControl('', Validators.required),
    review: new FormControl('', Validators.required)
  });
  post?: IPost;
  submitted = false
  updateSub: Subscription = new Subscription()

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostServices,
    private alertServices: AlertsServices
  ) {
  }

  ngOnInit() {
    this.route.params
      .pipe(
        //Оператор switchMap для того что бы изменить стрим. Stream Поток можно понимать как источник и/или приёмник бесконечного количества символов. Потоки обычно привязываются к физическому источнику/приёмнику символов, например, файлу, клавиатуре или консоли.
        switchMap((params: Params) =>
          //возврашаем из оператора switchMap новый стрим куда передаем значение params по его ключу id
          this.postService.getByID(params['id']))
        //В subscribe передается функция обратного вызова (callback), которая будет вызвана каждый раз, когда поток испускает новое значение. В вашем случае, когда getByID возвращает данные поста, этот пост передается в функцию обратного вызова subscribe.
      ).subscribe((post: IPost) => {
      //сохраняю объект в переменную что бы проще было с ним работать в submit()
      this.post = post
      console.log('this.post', this.post)
      //инициализируем форму которая позволяет менять данные поста, Конкретно, метод patchValue используется для частичного обновления значений формы.
      this.form.patchValue({
        name: post.name,
        surname: post.surname,
        expedition: post.expedition,
        social: post.social,
        review: post.review
      })
    })
  }

  ngOnDestroy() {
    if (this.updateSub) {
      this.updateSub.unsubscribe()
    }
  }

  submit() {
    if (this.form.invalid) {
      return
    } else {
      this.submitted = true
      this.updateSub = this.postService.update({
          //убеждаем TypeScript, что this.post действительно соответствует требованиям интерфейса IPost, Spread используем для копирования всех свойств из this.post в новый объект
        ...(this.post as IPost),
        name: this.form.value.name,
        surname: this.form.value.surname,
        expedition: this.form.value.expedition,
        social: this.form.value.social,
        review: this.form.value.review
      }).subscribe(() => {
        this.submitted = false
        this.alertServices.update('Пост был обновлен')
        this.router.navigate(['/admin', 'dashboard'])
      })
    }
  }
}
