import {Component, HostListener} from '@angular/core';
import {RouterModule} from "@angular/router";
import {fab, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {NgClass} from "@angular/common";
import {LanguageServices} from "../../services/language.services";
import {ButtonScrollTopComponent} from "../../components/button-scroll-top/button-scroll-top.component";

@Component({
  selector: 'app-site-layout',
  standalone: true,
  imports: [RouterModule, NgClass, ButtonScrollTopComponent],
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

// Переменная для хранения текущего выбранного языка
  currentLanguage = 'ua';
  // languages = ['ua', 'en', 'ru'];

  constructor(
    public languageService: LanguageServices
  ) {}

  //подменю для открытия языков
  openSubMenuLanguage(event: Event, language: string): void { //language здесь просто переменная не важно как ты ее назовешь
    this.currentLanguage = language; // Обновляем текущий выбранный язык
    this.languageService.setLanguage(language); // Обновляем язык в сервисе
    // Доступ к кликнутому элементу
    const el = event.target as HTMLElement;

    // // Удаляем выбранный язык из массива, если он уже есть
    // this.languages = this.languages.filter(l => l !== language);
    //
    // // Добавляем выбранный язык в начало массива
    // this.languages.unshift(language);

    // Определение, находится ли кликнутый элемент в пределах элемента списка .hasSubMenuLanguage
    const hasSubMenuLanguage = el.closest('.hasSubMenuLanguage');
    console.log('hasSubMenuLanguage', hasSubMenuLanguage)
    if (hasSubMenuLanguage) {
      // Переключение класса 'open' на родительском элементе 'a'
      const parentA = hasSubMenuLanguage.querySelector('a');
      if (parentA) {
        parentA.classList.toggle('open');
      }

      // Переключение отображения 'ul' подменю
      const submenu = hasSubMenuLanguage.querySelector('ul');
      if (submenu) {
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
      }
    }
  }
}
