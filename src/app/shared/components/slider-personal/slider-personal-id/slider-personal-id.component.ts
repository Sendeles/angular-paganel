import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ArraysService} from "../../../services/arrays.services";

@Component({
  selector: 'app-slider-personal-id',
  standalone: true,
  imports: [
    CommonModule, // для правильной работы *ngIf
  ],
  templateUrl: './slider-personal-id.component.html',
  styleUrl: './slider-personal-id.component.scss'
})
export class SliderPersonalIdComponent implements OnInit {

  images: string[] = []; //для того что бы прищвать массив из сервиса в компонент через this.imagesAndriiAnd
  currentIndex = 0;

  constructor(
    private route: ActivatedRoute, //используется, чтобы определить, какой слайд нужно открыть, основываясь на id, указанном в URL. Пример: Если URL /team/andrii-andreiev/3, то с помощью ActivatedRoute можно извлечь параметр 3 и открыть соответствующий слайд.
    private router: Router, // Router используется для программной навигации, например, чтобы закрыть слайдер и вернуться на главную страницу.
    public arraysService: ArraysService
  ) {
    this.images = this.arraysService.getImagesAndriiAnd()
  }

  ngOnInit() {
    // Получаем ID слайда из параметров маршрута
    this.route.params.subscribe((params) => {
      const slideId = +params['id'];
      if (slideId > 0 && slideId <= this.images.length) {
        this.currentIndex = slideId - 1;
      }
    });
  }

  // Переход к следующему слайду
  nextSlide(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }

  // Переход к предыдущему слайду
  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  // Закрыть окно
  close(): void {
    this.router.navigate(['/team/andrii-andreiev']); // Вернуться на главную страницу команды
  }
}
