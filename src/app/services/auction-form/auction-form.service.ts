import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionFormService {

  private formSubject = new Subject<FormGroup>();
  form$ = this.formSubject.asObservable();

  constructor() { }

  updateForm(values: any) {
    this.formSubject.next(values);
  }
}
