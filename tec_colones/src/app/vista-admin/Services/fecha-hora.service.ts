import { Injectable } from '@angular/core';
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class FechaHoraService {

  getDateTime(): string {
    const now = new Date();
    const dateTime = formatDate(now, 'yyyy-MM-dd HH:mm:ss', 'en-CR');
    return dateTime;
  }

  constructor() { }
}
