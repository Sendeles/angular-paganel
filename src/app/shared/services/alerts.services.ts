import {Injectable} from "@angular/core";
import {IAlerts} from "../models/alert/alerts.model";
import {Subject} from "rxjs";


export type AlertType = 'success' | 'warning' | 'delete'


@Injectable({
  providedIn: 'root'
})

export class AlertsServices {

  public alerts$ = new Subject<IAlerts>()

  success(text: string) {
    console.log('Метод success вызван с текстом:'); // Добавлен console.log
    this.alerts$.next({type: 'success', text})
  }

  warning(text: string) {
    this.alerts$.next({type: 'warning', text})
  }

  delete(text: string) {
    this.alerts$.next({type: 'delete', text})
  }
}
