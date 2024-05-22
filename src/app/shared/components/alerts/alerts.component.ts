import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AlertsServices} from "../../services/alerts.services";
import {CommonModule} from "@angular/common";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [
    CommonModule //без коммонмодуля не отображается аллерт
  ],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss'
})
export class AlertsComponent implements OnInit, OnDestroy {

  // sanitizedHtml - переменная, Использование SafeHtml позволяет пометить HTML-контент как безопасный с помощью средств, предоставляемых сервисом DomSanitizer, иначе не получиться скрыть div span и тд.
  sanitizedHtml: SafeHtml = '';


  //сколько визуально показывать данный алерт
  @Input() delay = 5000;

  public text: string = '';
  public type = 'success';
  public isSuccess = false; //Добавьте новое поле для отслеживания, является ли алерт "success" или нет
  alertSub?: Subscription;

  constructor(
    private sanitizer: DomSanitizer,
    private alertServices: AlertsServices,
    ) {
  }

  ngOnInit() {
    this.alertSub = this.alertServices.alerts$.subscribe(alert => {
      this.text = alert.text
      this.type = alert.type
      //применяем переменной конкретный тип алерта
      this.isSuccess = alert.type === 'success';
      //метод bypassSecurityTrustHtml для безопасного отображения HTML без span div и так далее:
      this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(alert.text);


      //Если не success то будет срабатывать сеттаймаут для того что бы алерт сам пропадал
      if (!this.isSuccess) {
        const timeout = setTimeout(() => {
          //очистка таймаута для избежания утечек памяти
          clearTimeout(timeout)
          // присваивание пустого значения, когда пустое значение текст сам по себе исчезнет
          this.text = ''
          //Таймаут по параметру this.delay
        }, this.delay)
      }
    })
  }

  ngOnDestroy() {
    if (this.alertSub) {
      this.alertSub.unsubscribe()
    }
  }
}
