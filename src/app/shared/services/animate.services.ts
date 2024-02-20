import {Directive, ElementRef, Renderer2, AfterViewInit, Injectable, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Platform } from '@angular/cdk/platform';


@Injectable({
  //Декоратор @Injectable с опцией providedIn: 'root' указывает, что сервис LanguageServices будет доступен глобально в приложении (т.е. будет создан один экземпляр (singleton) на весь Angular-модуль).
  providedIn: 'root'
})

export class AnimateOnViewServices {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, // PLATFORM_ID инжектируется для определения типа платформы
    private platform: Platform
  ) {}

  observeElement(element: ElementRef, callback: (elementIsVisible: boolean) => void): void {
    if (isPlatformBrowser(this.platform) && element) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          const elementIsVisible = entry.isIntersecting;
          callback(elementIsVisible);
          // Если нужно прекратить наблюдение после первого обнаружения
          // if (elementIsVisible) observer.unobserve(entry.target);
        });
      }, {threshold: 0.5});

      observer.observe(element.nativeElement);
    }
  }
}
