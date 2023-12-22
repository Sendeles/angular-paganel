import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: 'app-animate-on-view-services'
})
export class AnimateOnViewServices implements AfterViewInit {

  constructor(
    private el: ElementRef, private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'jumps_picture');
        }
      });
    }, {threshold: 0.5});

    observer.observe(this.el.nativeElement);
  }
}
