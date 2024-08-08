import { Component } from '@angular/core';
import {LanguageServices} from "../../shared/services/language.services";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-team-page',
  standalone: true,
  imports: [
    RouterModule // для перехода на другую страничку
  ],
  templateUrl: './team-page.component.html',
  styleUrl: './team-page.component.scss'
})
export class TeamPageComponent {

  andrew_and: string = './assets/images/photos/andrew_and_2.webp'
  olga_and: string ='./assets/images/photos/olga_and_2.webp'

  constructor(
    public languageService: LanguageServices
  ) {
  }

}
