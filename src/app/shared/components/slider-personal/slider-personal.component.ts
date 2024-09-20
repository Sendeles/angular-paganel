import {Component, Input} from '@angular/core';
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

  //через html вставляем картинки с одного компонента в другой
  @Input() images: string[] = [];
  currentIndex = 0;

  setMainImage(index: number): void {
    this.currentIndex = index;
  }

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

}
