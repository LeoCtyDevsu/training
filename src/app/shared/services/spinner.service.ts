import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  public spinnerSubject: BehaviorSubject<boolean>;
  public spinner$: Observable<boolean>;

  constructor() {
    this.spinnerSubject = new BehaviorSubject<boolean>(false);
    this.spinner$ = this.spinnerSubject.asObservable();
  }

  show() {
    this.spinnerSubject.next(true);
  }

  hide() {
    this.spinnerSubject.next(false);
  }
}
