import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: 'app-animate-on-view-services'
})
export class AnimateOnViewServices implements AfterViewInit {

  constructor(
    //ElementRef используется для получения ссылки на элемент, к которому применяется директива, а Renderer2 - для изменения этого элемента.
    private el: ElementRef, private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    //IntersectionObserver, который используется для отслеживания видимости элемента. принимает коллбэк функцию, которая вызывается каждый раз, когда наблюдаемый элемент пересекает порог видимости
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        //Внутри коллбэк функции для каждого пересечения (entry) проверяется, является ли элемент (entry) пересекающимся (isIntersecting). Если да, то к элементу добавляется CSS-класс jumps_picture с использованием Renderer2.
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'jumps_picture');
        }
      });
      //threshold: 0.5 означает, что коллбэк будет вызываться, когда 50% элемента станут видимыми
    }, {threshold: 0.5});

    observer.observe(this.el.nativeElement);
  }
}
