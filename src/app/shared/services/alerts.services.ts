import {Injectable} from "@angular/core";
import {IAlerts} from "../models/alert/alerts.model";
import {Subject} from "rxjs";


export type AlertType = 'update' | 'warning' | 'delete' | 'added'


@Injectable({
  providedIn: 'root'
})

export class AlertsServices {

  public alerts$ = new Subject<IAlerts>()

  update(text: string) {
    console.log('Метод update вызван с текстом:'); // Добавлен console.log
    this.alerts$.next({type: 'update', text})
  }

  warning(text: string) {
    this.alerts$.next({type: 'warning', text})
  }

  delete(text: string) {
    this.alerts$.next({type: 'delete', text})
  }

  added(text: string) {
    console.log('Вызван метод added с текстом:', text);
    this.alerts$.next({type: 'added', text})
  }
}
