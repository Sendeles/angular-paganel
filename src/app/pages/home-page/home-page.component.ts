import {AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import {CommonModule, isPlatformBrowser} from "@angular/common";
import {LanguageServices} from "../../shared/services/language.services";
import {SliderCommentsComponent} from "../../shared/components/slider-comments/slider-comments.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, SliderCommentsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements AfterViewInit {

  image: string = './assets/images/paganelStudioExpedition.webp';
  piece: string = './assets/images/piece.webp';
  jumps1: string = './assets/images/jumps1.webp';
  jumps2: string = './assets/images/jumps2.webp';
  jumps3: string = './assets/images/jumps3.webp';
  sun: string = './assets/images/sun.webp';
  love: string = './assets/images/icons/love.webp';
  team: string = './assets/images/icons/team.webp';
  mark_1: string = './assets/images/marks/mark_1.webp';
  mark_2: string = './assets/images/marks/mark_2.webp';
  mark_3: string = './assets/images/marks/mark_3.webp';
  mark_4: string = './assets/images/marks/mark_4.webp';
  andrew_and: string = './assets/images/photos/andrew_and.webp';
  anna_lyt: string = './assets/images/photos/anna_lyt.webp';
  daria_sto: string = './assets/images/photos/daria_sto.webp';
  evgeny_raf: string = './assets/images/photos/evgeny_raf.webp';
  kostya_sto: string = './assets/images/photos/kostya_sto.webp';
  olga_and: string = './assets/images/photos/olga_and.webp';
  yulia_shn: string = './assets/images/photos/yulia_shn.webp';
  yulia_svy: string = './assets/images/photos/yulia_svy.webp';


  isVisible: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public languageService: LanguageServices
  ) {
  }

  @ViewChild('imageContainer') imageContainer!: ElementRef;

  ngAfterViewInit() {
    //if (isPlatformBrowser(this.platformId)) проверяет, выполняется ли код в браузере. Это важно для избежания
    // ошибок во время серверного рендеринга (например, с использованием Angular Universal), где объекты,
    // специфичные для браузера, такие как IntersectionObserver, не доступны.
    if (isPlatformBrowser(this.platformId)) {
      // Создание IntersectionObserver: Создается новый экземпляр IntersectionObserver, который будет отслеживать
      // видимость элемента. IntersectionObserver принимает два аргумента: коллбэк функцию и объект опций.
      let observer = new IntersectionObserver((entries, observer) => {
        //Коллбэк функция проходит через все entries (элементы, пересекающие порог видимости) и проверяет,
        // является ли элемент видимым (entry.isIntersecting). Если элемент видим, переменная this.isVisible
        // устанавливается в true, и в консоль выводится сообщение "Element is visible".
        entries.forEach((entry: any) => {
          if (entry.isIntersecting) {
            this.isVisible = true
            console.log('Element is visible')
          }
        });
        //Коллбэк функция вызывается каждый раз, когда наблюдаемый элемент пересекает заданный порог видимости
        // (threshold: 0.5). В этом случае порог установлен в 0.5, что означает, что коллбэк будет вызываться,
        // когда 50% элемента станут видимыми в области просмотра.
      }, {threshold: 0.5})

      //this.imageContainer.nativeElement. Это означает, что IntersectionObserver будет отслеживать,
      // когда данный элемент становится видимым или невидимым в области просмотра.
      observer.observe(this.imageContainer.nativeElement);
    }
  }
}
