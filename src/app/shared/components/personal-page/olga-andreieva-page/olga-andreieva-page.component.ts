import {Component, ViewChild} from '@angular/core';
import {SliderPersonalComponent} from "../../slider-personal/slider-personal.component";
import {ISocialLink} from "../../../constants/sociallink";
import {LanguageServices} from "../../../services/language.services";
import {ActivatedRoute, Router} from "@angular/router";
import {ArraysService} from "../../../services/arrays.services";

@Component({
  selector: 'app-olga-andreieva-page',
  standalone: true,
  imports: [
    SliderPersonalComponent
  ],
  templateUrl: './olga-andreieva-page.component.html',
  styleUrl: './olga-andreieva-page.component.scss'
})
export class OlgaAndreievaPageComponent {
  imagesOlgaAnd: string[] = []; //для того что бы прищвать массив из сервиса в компонент через this.imagesAndriiAnd

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
  olga_smile: string = './assets/images/personal/olga-and/slider/olga-and-slider-11.jpg';

  constructor(
    public languageService: LanguageServices,
    private route: ActivatedRoute,
    private router: Router,
    public arraysService: ArraysService,
  ) {
    this.imagesOlgaAnd = this.arraysService.getImagesOlgaAnd()

    this.route.params.subscribe(params => {
      const slideId = +params['id']; // Преобразуем параметр id в число
      if (slideId && slideId > 0) {
        this.openSlide(slideId - 1); // Открываем соответствующий слайд
      }
    });
  }

  //Этот метод используется для управления слайдером внутри текущего компонента.
  openSlide(index: number): void {
    if (this.sliderComponent) {
      this.sliderComponent.setMainImage(index); // Устанавливаем индекс в слайдере
    }
  }

  //Этот метод отвечает за переход на другой маршрут, где открывается слайдер в "полноэкранном" или отдельном режиме.
  openSlideInFullView(index: number): void {
    const slideId = index + 1;
    const route = `/team/olga-andreieva/${slideId}`;
    console.log('Navigating to:', route);
    this.router.navigate([route]);
  }

}
