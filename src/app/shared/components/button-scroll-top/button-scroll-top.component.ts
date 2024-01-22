import {Component, HostListener, OnInit} from '@angular/core';
import {window} from "rxjs/operators";

@Component({
  selector: 'app-button-scroll-top',
  standalone: true,
  imports: [],
  templateUrl: './button-scroll-top.component.html',
  styleUrl: './button-scroll-top.component.scss'
})
export class ButtonScrollTopComponent implements OnInit {

  ngOnInit() {
  }

  public showScrollButton: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 20;
  }

  scrollToTop() {
    window.scrollTo({top:0, behavior: 'smooth'});
  }

}
