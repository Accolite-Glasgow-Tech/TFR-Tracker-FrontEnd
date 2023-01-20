import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavToggleService {
  @Output() toggleEmitter: EventEmitter<any> = new EventEmitter();
  toggle() {
    this.toggleEmitter.emit();
  }
  constructor() {}
}
