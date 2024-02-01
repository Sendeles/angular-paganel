import {AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ISlide} from "../../models/slider/slider.model";

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})

export class SliderComponent {
  @Input() images: ISlide[] = []
  selectedIndex = 0;


  @HostListener('panstart', ['$event']) onSliderPanEnd(event: any) {
    console.log(event)
  }

  showPrev(i: number) {
    console.log('tesst');
    if (this.selectedIndex > 0) {
      this.selectedIndex = i - 1;
    }
  }

  showNext(i: number) {
    console.log('test', i);
    if (this.selectedIndex < this.images?.length - 1) {
      this.selectedIndex = i + 1;
    }
  }
}
