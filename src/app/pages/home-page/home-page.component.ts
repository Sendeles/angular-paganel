import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {HomePageRoutingModule} from "./home-page-routing.module";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

 image: string = './assets/images/paganelStudioExpedition.png'

}
