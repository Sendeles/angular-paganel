import {AlertType} from "../../services/alerts.services";

export interface IAlerts {
  type: AlertType,
  text: string
}
