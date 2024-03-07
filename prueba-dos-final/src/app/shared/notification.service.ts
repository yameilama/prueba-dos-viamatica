import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private messageSource = new BehaviorSubject<string | null>(null);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  setMessage(message: string, timeOut = 5000) {
    this.messageSource.next(message);
    setTimeout(() => this.clearMessage(), timeOut);

  }

  clearMessage() {
    this.messageSource.next(null);
  }
}
