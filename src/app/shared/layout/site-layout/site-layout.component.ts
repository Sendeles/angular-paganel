import {Component} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule, NgClass} from "@angular/common";
import {LanguageServices} from "../../services/language.services";
import {ButtonScrollTopComponent} from "../../components/button-scroll-top/button-scroll-top.component";
import {AlertsComponent} from "../../components/alerts/alerts.component";

@Component({
  selector: 'app-site-layout',
  standalone: true,
  imports: [
    RouterModule,
    NgClass,
    ButtonScrollTopComponent,
    CommonModule,
    AlertsComponent // для отображения алертов
  ],
  templateUrl: './site-layout.component.html',
  styleUrl: './site-layout.component.scss'
})
export class SiteLayoutComponent {

  logo: string = './assets/images/logo.webp'
  aboutUs: string = './assets/images/aboutUs.webp'
  travels: string = './assets/images/travels.webp'
  blog: string = './assets/images/blog.webp'
  contact: string = './assets/images/contact.webp'

  facebook: string = './assets/images/social/facebook.webp'
  instagram: string = './assets/images/social/instagram.webp'
  vimeo: string = './assets/images/social/vimeo.webp'
  youtube: string = './assets/images/social/youtube.webp'

  constructor(
    public languageService: LanguageServices,
  ) {}

  //подменю для открытия языков
  openSubMenuLanguage(event: Event, language: string, languageMenu: HTMLElement): void { //language здесь просто переменная не важно как ты ее назовешь
// Обновляем язык в сервисе
    this.languageService.setLanguage(language);
    // Доступ к кликнутому элементу
    // const el = event.target as HTMLElement;

    // Удаляем выбранный язык из массива, если он уже есть
    // Предположим, пользователь решает сменить язык на русский ('ru'). В этот момент вызывается метод setLanguage('ru').
    // Удаляем 'ru', если он есть
    // После этой операции, если бы 'ru' был в списке, массив стал бы ['ua', 'en']
    // Но поскольку мы предполагаем смену с 'ua' на 'ru', на этом шаге массив остаётся прежним ['ua', 'en', 'ru']
    this.languageService.languages = this.languageService.languages.filter(lang => lang !== language);

    // Добавляем выбранный язык в начало массива
    // Теперь массив языков выглядит как ['ru', 'ua', 'en']
    this.languageService.languages.unshift(language);

    languageMenu.classList.toggle('open');
  }
}
