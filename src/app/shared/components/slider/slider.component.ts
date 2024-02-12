import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener, Inject,
  Input, PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import {CommonModule, isPlatformBrowser} from "@angular/common";
import {ISlide} from "../../models/slider/slider.model";

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})

export class SliderComponent implements AfterViewInit {
  @Input() images: ISlide[] = []
  selectedIndex = 0;
  intervalId: any

  constructor(
    private el: ElementRef, private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object // PLATFORM_ID инжектируется для определения типа платформы
  ) {
  }


  // @HostListener('panstart', ['$event']) onSliderPanEnd(event: any) {
  //   console.log(event)
  // }

  startAutoScroll(): void {
    this.intervalId = setTimeout(() => {
      // Переход к следующему слайду или возвращение к первому, если текущий слайд последний
      this.selectedIndex = (this.selectedIndex + 1) % this.images.length;
      this.startAutoScroll(); // Рекурсивно вызываем startAutoScroll для повторения
    }, 3000); // 3000 мс = 3 секунды
  }

  stopAutoScroll(): void {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  }

  private initializeIntersectionObserver(): void {
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          // Когда элемент становится видимым, начинаем автоматическую прокрутку слайдов
          this.startAutoScroll();
        }
      });
    }, {threshold: 0.5});

    observer.observe(this.el.nativeElement);
  }

  ngAfterViewInit() {
    //     //IntersectionObserver доступен только в браузерах. Проверьте, не пытаетесь ли вы использовать IntersectionObserver на сервере. Вам нужно будет добавить условие для проверки, выполняется ли код на сервере или клиенте, используя isPlatformBrowser
    if (isPlatformBrowser(this.platformId)) {
      this.initializeIntersectionObserver();
    }
  }

  @HostListener('click') onMouseClick() {
    this.stopAutoScroll();
  }

  //переход на предыдущий слайдер
  showPrev(i: number) {
    console.log('Previous slide', i);
    if (this.selectedIndex > 0) {
      // Если не первый слайд, переходим к предыдущему
      this.selectedIndex = i - 1;
    } else {
      // Если первый слайд, переходим к последнему
      this.selectedIndex = this.images.length - 1;
    }
  }

  //переход на следующий слайд
  showNext(i: number) {
    console.log('Next slide', i);
    if (this.selectedIndex < this.images.length - 1) {
      // Если не последний слайд, переходим к следующему
      this.selectedIndex = i + 1;
    } else {
      // Если последний слайд, возвращаемся к первому
      this.selectedIndex = 0;
    }
  }

  //При клике на слайд он становился выбранным (с классом selected)
  selectSlide(index: number): void {
    this.selectedIndex = index; // Обновление индекса выбранного слайда
    this.stopAutoScroll(); // Останавливаем автопрокрутку при ручном выборе слайда
  }
}
