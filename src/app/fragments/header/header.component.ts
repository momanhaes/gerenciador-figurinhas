import { Subscription } from 'rxjs';
import { SLIDE } from 'src/app/animations/slide.animation';
import { Component, HostListener, OnInit } from '@angular/core';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [SLIDE],
})
export class HeaderComponent implements OnInit {
  @HostListener('window:scroll') onScrollEvent() {
    this.scrolled = true;

    if (window.innerHeight + window.scrollY <= document.body.offsetHeight) {
      this.scrolled = false;
    }
  }

  public subscribeMobile!: Subscription;
  public scrolled: boolean = false;
  public isMobile!: boolean;
  public class!: string;

  public state = 'ready';

  constructor(private windowService: WindowService) {
    this.isMobile = window.innerWidth <= windowService.widthMobile;
  }

  ngOnInit() {
    this.subscribeMobile = this.windowService.hasMobile.subscribe((hasMobile: boolean) => (this.isMobile = hasMobile));
    this.class = 'fa fa-sticky-note-o fa-flip-horizontal mr-2';
  }

  mouseEnter() {
    this.class = 'fa fa-sticky-note fa-flip-horizontal mr-2';
  }

  mouseLeave() {
    this.class = 'fa fa-sticky-note-o fa-flip-horizontal mr-2';
  }
}
