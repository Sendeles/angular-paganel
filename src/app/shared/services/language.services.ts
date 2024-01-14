import { Injectable } from '@angular/core';
import { translations } from '../translations/translations';

//Injectable из @angular/core, который необходим для создания сервиса, который может быть внедрен в другие компоненты или сервисы Angular.
@Injectable({
  //Декоратор @Injectable с опцией providedIn: 'root' указывает, что сервис LanguageServices будет доступен глобально в приложении (т.е. будет создан один экземпляр (singleton) на весь Angular-модуль).
  providedIn: 'root'
})
export class LanguageServices {
  //инициализируете переменную language значением 'ua'. Это означает, что по умолчанию значение переменной language установлено в 'ua'
  private language = 'ua';

  constructor() {
    //if (typeof localStorage !== 'undefined') { ... }: Проверяет, определен ли объект localStorage. Это необходимо для SSR, где localStorage не доступен.
    if (typeof localStorage !== 'undefined') {
      // this.language = localStorage.getItem('language') || 'ua';: Пытается получить сохраненный язык из localStorage. Если значение отсутствует, используется 'ua' (украинский) по умолчанию.
      this.language = localStorage.getItem('language') || 'ua';
    }
  }

  //Публичный метод для получения текущего языка.
  getLanguage() {
    return this.language;
  }

  //Публичный метод для установки нового языка.
  setLanguage(lang: string) {
    this.language = lang;
    //Сохраняет выбранный язык в localStorage для дальнейшего использования.
    localStorage.setItem('language', lang);
  }

  //Публичный метод для получения перевода по ключу `key`.
  getTranslate(key: string) {
    //Возвращает перевод для заданного ключа `key` на текущем языке, хранящемся в `language`. Это делается путем доступа к соответствующему значению в объекте `translations`, используя `key` и текущий язык.
    return translations[key][this.language];
  }
}
