import {Component, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SliderPersonalComponent} from "../../slider-personal/slider-personal.component";
import {ISlide} from "../../../models/slider/slider.model";
import {LanguageServices} from "../../../services/language.services";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {ISocialLink} from "../../../constants/sociallink";
import {ArraysService} from "../../../services/arrays.services";

@Component({
  selector: 'app-andrii-andreiev-page',
  standalone: true,
  imports: [
    CommonModule,
    SliderPersonalComponent
  ],
  templateUrl: './andrii-andreiev-page.component.html',
  styleUrl: './andrii-andreiev-page.component.scss'
})
export class AndriiAndreievPageComponent {

  imagesAndriiAnd: string[] = []; //для того что бы прищвать массив из сервиса в компонент через this.imagesAndriiAnd

//@ViewChild — это декоратор Angular, который позволяет родительскому компоненту получить ссылку на дочерний компонент или DOM-элемент. В данном случае:
// SliderPersonalComponent — это дочерний компонент, который вы хотите контролировать из родительского компонента (AndriiAndreievPageComponent).
// sliderComponent — это переменная, в которой будет храниться экземпляр SliderPersonalComponent.
// Таким образом, с помощью @ViewChild родительский компонент (AndriiAndreievPageComponent) может напрямую взаимодействовать с дочерним компонентом (SliderPersonalComponent), вызывая его методы или получая доступ к его свойствам.
// Родительский компонент может использовать эту переменную для: 1)Вызова методов дочернего компонента. 2)Изменения его свойств. 3) Чтения текущего состояния дочернего компонента.
// Допустим, у нас есть метод setMainImage() в SliderPersonalComponent, который позволяет установить текущий слайд. С помощью @ViewChild вы можете вызывать этот метод из родительского компонента.
  @ViewChild(SliderPersonalComponent) sliderComponent!: SliderPersonalComponent;
  socialLink = ISocialLink;
  sun: string = './assets/images/sun.webp';
  andrii_and_sign: string = './assets/images/signatures/andrii_and_sign.webp';
  facebook_2: string = './assets/images/social/facebook_2.webp';
  andrii_tongue: string = './assets/images/personal/andrii-and/andrii_tongue.webp';

  constructor(
    public languageService: LanguageServices,
    private route: ActivatedRoute,
    private router: Router,
    public arraysService: ArraysService,
  ) {
    this.imagesAndriiAnd = this.arraysService.getImagesAndriiAnd()

    this.route.params.subscribe(params => {
      const slideId = +params['id']; // Преобразуем параметр id в число
      if (slideId && slideId > 0) {
        this.openSlide(slideId - 1); // Открываем соответствующий слайд
      }
    });
  }

  // imagesAndriiAnd = [
  //   'assets/images/personal/andrii-and/slider/andrii-and-slider-1.webp',
  //   'assets/images/personal/andrii-and/slider/andrii-and-slider-2.webp',
  //   'assets/images/personal/andrii-and/slider/andrii-and-slider-3.webp',
  //   'assets/images/personal/andrii-and/slider/andrii-and-slider-4.webp',
  //   'assets/images/personal/andrii-and/slider/andrii-and-slider-5.webp',
  //   'assets/images/personal/andrii-and/slider/andrii-and-slider-6.webp',
  //   'assets/images/personal/andrii-and/slider/andrii-and-slider-7.webp',
  //   'assets/images/personal/andrii-and/slider/andrii-and-slider-8.webp',
  //   'assets/images/personal/andrii-and/slider/andrii-and-slider-10.webp',
  //   'assets/images/personal/andrii-and/slider/andrii-and-slider-11.webp',
  //   'assets/images/personal/andrii-and/slider/andrii-and-slider-12.webp',
  //   'assets/images/personal/andrii-and/slider/andrii-and-slider-13.webp',
  //   'assets/images/personal/andrii-and/slider/andrii-and-slider-14.webp',
  //   'assets/images/personal/andrii-and/slider/andrii-and-slider-15.webp',
  //   'assets/images/personal/andrii-and/slider/andrii-and-slider-16.webp',
  //   'assets/images/personal/andrii-and/slider/andrii-and-slider-17.webp',
  //   'assets/images/personal/andrii-and/slider/andrii-and-slider-18.webp',
  //   'assets/images/personal/andrii-and/slider/andrii-and-slider-19.webp',
  // ]

  //Этот метод используется для управления слайдером внутри текущего компонента.
  openSlide(index: number): void {
    if (this.sliderComponent) {
      this.sliderComponent.setMainImage(index); // Устанавливаем индекс в слайдере
    }
  }

  //Этот метод отвечает за переход на другой маршрут, где открывается слайдер в "полноэкранном" или отдельном режиме.
  openSlideInFullView(index: number): void {
    const slideId = index + 1;
    this.router.navigate([`/team/andrii-andreiev/${slideId}`]);
  }


}

