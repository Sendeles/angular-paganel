import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-button-scroll-top',
  standalone: true,
  imports: [],
  templateUrl: './button-scroll-top.component.html',
  styleUrl: './button-scroll-top.component.scss'
})
export class ButtonScrollTopComponent implements OnInit {


  showScrollButton: boolean = false;

  ngOnInit() {
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({top:0, behavior: 'smooth'});
  }

}
