import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-slider-personal',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './slider-personal.component.html',
  styleUrl: './slider-personal.component.scss'
})
export class SliderPersonalComponent {

  //через html вставляем картинки с одного компонента в другой, за это отвечает @Input()
  @Input() images: string[] = [];
  //ViewChild для получения доступа к контейнеру с миниатюрами
  @ViewChild('thumbnailsContainer') thumbnailsContainer!: ElementRef;
  currentIndex = 0;

  setMainImage(index: number): void {
    this.currentIndex = index;
    this.scrollThumbnails();
  }

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.scrollThumbnails();
  }

  prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.scrollThumbnails();
  }

  //опрееделение первого слайда
  isFirstSlide(): boolean {
    return this.currentIndex === 0;
  }

  //опеределение последнего слайда
  isLastSlide(): boolean {
    return this.currentIndex === this.images.length - 1;
  }

  //это приватный метод, который я добавил в компонент для прокрутки миниатюр.
  private scrollThumbnails(): void {
    const thumbnail = this.thumbnailsContainer.nativeElement.children[this.currentIndex]; // thumbnailsContainer.nativeElement - это прямой доступ к DOM элементу div с классом thumbnails / children[this.currentIndex] - получаем дочерний элемент (миниатюру) по текущему индексу
    thumbnail.scrollIntoView({ behavior: 'smooth', inline: 'center' }); //scrollIntoView - встроенный метод браузера для прокрутки элемента в видимую область
  }

}
