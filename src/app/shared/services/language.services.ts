import { Injectable } from '@angular/core';
import { translations } from '../translations/translations';

//Injectable из @angular/core, который необходим для создания сервиса, который может быть внедрен в другие компоненты или сервисы Angular.
@Injectable({
  //Декоратор @Injectable с опцией providedIn: 'root' указывает, что сервис LanguageServices будет доступен глобально в приложении (т.е. будет создан один экземпляр (singleton) на весь Angular-модуль).
  providedIn: 'root'
})
export class LanguageServices {
  //инициализируете переменную currentLanguage значением 'ua'. Это означает, что по умолчанию значение переменной currentLanguage установлено в 'ua'
  private currentLanguage = 'ua';
  languages = ['ua', 'en', 'ru'];


  constructor() {
    //if (typeof localStorage !== 'undefined') { ... }: Проверяет, определен ли объект localStorage. Это необходимо для SSR, где localStorage не доступен.
    if (typeof localStorage !== 'undefined') {
      // this.language = localStorage.getItem('currentLanguage') || 'ua';: Пытается получить сохраненный язык из localStorage. Если значение отсутствует, используется 'ua' (украинский) по умолчанию.
      this.currentLanguage = localStorage.getItem('currentLanguage') || 'ua';
    }
  }

  //Публичный метод для получения текущего языка.
  getLanguage() {
    return this.currentLanguage;
  }

  //Публичный метод для смены со старого языка на новый язык.
  setLanguage(language: string) {
    //language - оператор присваивания, Внутри метода переменная this.currentLanguage устанавливается равной переданному параметру language, тем самым обновляя текущий выбранный язык в сервисе.
    this.currentLanguage = language;
    //Сохраняет выбранный язык в localStorage для дальнейшего использования. что позволяет сохранить выбор пользователя даже после перезагрузки страницы.
    localStorage.setItem('currentLanguage', language);
    console.log('this.currentLanguage', this.currentLanguage)
  }

  //Публичный метод для получения перевода по ключу `key`.
  getTranslate(key: string) {
    //Возвращает перевод для заданного ключа `key` на текущем языке, хранящемся в `currentLanguage`. Это делается путем доступа к соответствующему значению в объекте `translations`, используя `key` и текущий язык.
    return translations[key][this.currentLanguage];
  }


  //.filter() — это функция высшего порядка в JavaScript, доступная для всех массивов. Она создаёт новый массив, содержащий все элементы исходного массива, которые удовлетворяют условию, заданному в предоставленной ей функции.
  //
  // lang => lang !== this.currentLanguage — это стрелочная функция, которая передаётся в метод .filter(). Она вызывается для каждого элемента массива this.languages.
  //
  // lang !== this.currentLanguage — это логическое условие внутри стрелочной функции. Для каждого языка lang в массиве this.languages оно проверяет, не равен ли он текущему выбранному языку (this.currentLanguage). Если язык lang не равен this.currentLanguage, то условие возвращает true.
  //
  // Когда условие возвращает true, это означает, что текущий элемент lang должен быть включён в новый массив, который возвращает .filter().
  //
  // В результате, метод getFilteredLanguages() возвращает массив всех языков, кроме текущего выбранного языка. Например, если this.languages содержит ['en', 'ua', 'ru'], и this.currentLanguage равен 'ua', то getFilteredLanguages() вернёт ['en', 'ru']. Этот метод может использоваться в шаблоне для динамического создания списка языков, из которого исключ
  getFilteredLanguages() {
    return this.languages.filter((lang) => lang !== this.currentLanguage);
  }
}
