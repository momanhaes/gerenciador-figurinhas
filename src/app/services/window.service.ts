import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WindowService {
  @Output() isMobile = new EventEmitter<boolean>();

  constructor() {}

  get widthMobile(): number {
    return 1025;
  }
}
