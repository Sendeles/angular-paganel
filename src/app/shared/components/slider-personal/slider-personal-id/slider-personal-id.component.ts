import {Component, Input, OnInit} from '@angular/core';
import { CommonModule, Location } from "@angular/common";
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

  constructor(
    private route: ActivatedRoute,
    public arraysService: ArraysService,
    private location: Location, // Добавляем Location
    private languageService: LanguageServices,
  ) {}

  ngOnInit() {
    const url$ = this.route.url;
    const params$ = this.route.params;

    // Поток для загрузки изображений на основе маршрута, что бы слайдер понимал какие фотки грузить, андрея или Ольги и так далее...
    this.images$ = url$.pipe(
      map(urlSegments => {
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
        const slideId = +params['id'];
        return slideId > 0 && slideId <= images.length ? slideId - 1 : 0;
      })
    ).subscribe(initialIndex => this.currentIndexSubject.next(initialIndex));
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
    this.location.back();
    console.log()
  }
}

