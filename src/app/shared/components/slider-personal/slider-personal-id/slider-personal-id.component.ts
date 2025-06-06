import {Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {CommonModule, isPlatformBrowser, Location} from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { ArraysService } from "../../../services/arrays.services";
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {LanguageServices} from "../../../services/language.services";

@Component({
  selector: 'app-slider-personal-id',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './slider-personal-id.component.html',
  styleUrls: ['./slider-personal-id.component.scss']
})
export class SliderPersonalIdComponent implements OnInit {

  images$: Observable<string[]> = new Observable<string[]>(); // Поток изображений
  private currentIndexSubject = new BehaviorSubject<number>(0); // Управление текущим индексом через BehaviorSubject
  currentIndex$ = this.currentIndexSubject.asObservable(); // Поток текущего индекса
  personName: string = "Person Name"; // Свойство для хранения имени для когда хочешь отерыть слайдер в отдельном окне
  isFullscreen: boolean = false; // Для второго открытия картинки на весь екран

  // Получаем доступ к элементу .popup-content
  @ViewChild('popupContent', { static: false }) popupContent!: ElementRef<HTMLDivElement>;

  constructor(
    private route: ActivatedRoute,
    public arraysService: ArraysService,
    private location: Location, // Добавляем Location
    private languageService: LanguageServices,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.images$ = new Observable<string[]>();
  }

  ngOnInit() {
    const url$ = this.route.url;
    const params$ = this.route.params;

    // Что бы видеть значение в консль лог, если консоль лог не интересен то удалить
    this.currentIndex$.subscribe(value => {
      console.log('currentIndex$ value:', value);
    });

    // Поток для загрузки изображений на основе маршрута, что бы слайдер понимал какие фотки грузить, андрея или Ольги и так далее...
    this.images$ = url$.pipe(
      map(urlSegments => {
        console.log('urlSegments:', urlSegments); // Отладка
        if (urlSegments.some(segment => segment.path === 'olga-andreieva')) {
          this.personName = this.languageService.getTranslate('OLGA_ANDREIEVA') //передача имени в зависимости от открытия отдельно слайдера
          return this.arraysService.getImagesOlgaAnd();
        } else if (urlSegments.some(segment => segment.path === 'andrii-andreiev')) {
          this.personName = this.languageService.getTranslate('ANDRII_ANDREIEV') //передача имени в зависимости от открытия отдельно слайдера
          return this.arraysService.getImagesAndriiAnd();
        } else {
          return [];
        }
      })
    );

    // Установка начального значения индекса из параметров маршрута
    combineLatest([this.images$, params$]).pipe(
      map(([images, params]) => {
        console.log('images:', images, 'params:', params); // Отладка
        const slideId = +params['id'];
        return slideId > 0 && slideId <= images.length ? slideId - 1 : 0;
      })
    ).subscribe(initialIndex => this.currentIndexSubject.next(initialIndex));

    // Проверяем, что код выполняется в браузере, перед добавлением слушателя
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('fullscreenchange', this.onFullscreenChange.bind(this));
    }
  }

  toggleFullscreen() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.isFullscreen) {
        // Входим в полноэкранный режим
        const element = this.popupContent.nativeElement;
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if ((element as any).webkitRequestFullscreen) { // Для Safari
          (element as any).webkitRequestFullscreen();
        } else if ((element as any).msRequestFullscreen) { // Для IE/Edge
          (element as any).msRequestFullscreen();
        }
      } else {
        // Выходим из полноэкранного режима
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) { // Для Safari
          (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) { // Для IE/Edge
          (document as any).msExitFullscreen();
        }
      }
    }
  }

  // Обработчик события изменения полноэкрана
  onFullscreenChange() {
    if (isPlatformBrowser(this.platformId)) {
      this.isFullscreen = !!document.fullscreenElement;
    }
  }

  fullscreenClose() {
    this.isFullscreen = false
    this.location.back();
    console.log('fullscreen closed');
  }

  nextSlide(): void {
    this.images$.subscribe(images => {
      const currentIndex = this.currentIndexSubject.value; // Получить текущее значение индекса
      if (currentIndex < images.length - 1) {
        this.currentIndexSubject.next(currentIndex + 1); // Увеличить индекс на 1
      }
    });
  }

// Переход к предыдущему слайду
  prevSlide(): void {
    const currentIndex = this.currentIndexSubject.value; // Получить текущее значение индекса
    if (currentIndex > 0) {
      this.currentIndexSubject.next(currentIndex - 1); // Уменьшить индекс на 1
    }
  }

  // Закрыть окно
  close(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isFullscreen = false;
    }
    this.location.back();
  }
}

