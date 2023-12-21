import {Component, HostListener} from '@angular/core';
import {RouterModule} from "@angular/router";
import {fab, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-site-layout',
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: './site-layout.component.html',
  styleUrl: './site-layout.component.scss'
})
export class SiteLayoutComponent {

  logo: string = './assets/images/logo.webp'
  aboutUs: string = './assets/images/aboutUs.webp'
  travels: string = './assets/images/travels.webp'
  blog: string = './assets/images/blog.webp'
  contact: string = './assets/images/contact.webp'

  facebook: string = './assets/images/social/facebook.webp'
  instagram: string = './assets/images/social/instagram.webp'
  vimeo: string = './assets/images/social/vimeo.webp'
  youtube: string = './assets/images/social/youtube.webp'


  constructor() {}

  //подменю для открытия языков
  openSubMenu(event: Event): void {
    const el = event.target as HTMLHRElement;
    el.classList.contains('open') ? el.classList.remove('open') : el.classList.add('open');
  }

}
