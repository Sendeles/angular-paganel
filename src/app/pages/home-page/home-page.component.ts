import {AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import {CommonModule, isPlatformBrowser} from "@angular/common";
import {HomePageRoutingModule} from "./home-page-routing.module";
import {LanguageServices} from "../../shared/services/language.services";

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
