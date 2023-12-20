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

  // isVisible: boolean = false;
  // isVisibleFirst: boolean = false;
  // isVisibleSecond: boolean = false;
  // isVisibleThird: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  // @ViewChild('imageContainer') imageContainer!: ElementRef;
  //
  ngAfterViewInit() {
  //   if (isPlatformBrowser(this.platformId)) {
  //     let observer = new IntersectionObserver((entries, observer) => {
  //       entries.forEach((entry: any) => {
  //         if (entry.isIntersecting) {
  //           const imgClass = entry.target.getAttribute('class');
  //           if (imgClass) {
  //             if (imgClass.includes('first')) {
  //               this.isVisibleFirst = true;
  //             } else if (imgClass.includes('second')) {
  //               this.isVisibleSecond = true;
  //             } else if (imgClass.includes('third')) {
  //               this.isVisibleThird = true;
  //             }
  //           }
  //         }
  //       });
  //     }, {threshold: 0.5})
  //
  //     observer.observe(this.imageContainer.nativeElement);
  //   }
  }
}
