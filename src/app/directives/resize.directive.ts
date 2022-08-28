import { Directive, HostListener } from '@angular/core';
import { WindowService } from '../services/window.service';

@Directive({
  selector: '[resize]',
})
export class ResizeDirective {
  constructor(private win: WindowService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width = event.target.innerWidth;
    this.win.isMobile.emit(width <= this.win.widthMobile);
  }
}
 