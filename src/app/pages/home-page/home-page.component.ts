import {AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import {CommonModule, isPlatformBrowser} from "@angular/common";
import {HomePageRoutingModule} from "./home-page-routing.module";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements AfterViewInit {

  image: string = './assets/images/paganelStudioExpedition.webp';
  piece: string = './assets/images/piece.webp';
  jumps1: string = './assets/images/jumps1.webp';
  jumps2: string = './assets/images/jumps2.webp';
  jumps3: string = './assets/images/jumps3.webp';
  love: string = './assets/images/love.webp';
  sun: string = './assets/images/sun.webp';
  mark_1: string = './assets/images/marks/mark_1.webp'
  mark_2: string = './assets/images/marks/mark_2.webp'
  mark_3: string = './assets/images/marks/mark_3.webp'
  mark_4: string = './assets/images/marks/mark_4.webp'


  isVisible: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  @ViewChild('imageContainer') imageContainer!: ElementRef;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry: any) => {
          if (entry.isIntersecting) {
            this.isVisible = true
            console.log('Element is visible')
          }
        });
      }, {threshold: 0.5})

      observer.observe(this.imageContainer.nativeElement);
    }
  }
}
