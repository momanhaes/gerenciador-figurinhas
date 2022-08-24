import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ALERT_THEME } from 'src/app/utils/theme';
import { SLIDE } from 'src/app/animations/slide.animation';
import { UserService } from 'src/app/services/user.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { WindowService } from 'src/app/services/window.service';
import Swal from 'sweetalert2';

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
  public alertTheme = ALERT_THEME;
  public isMobile!: boolean;
  public class!: string;

  public state = 'ready';

  constructor(private windowService: WindowService, private userService: UserService, private router: Router) {
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

  public logout(): void {
    Swal.fire({
      title: 'Você escolheu sair.',
      text: 'Tem certeza?',
      icon: 'warning',
      background: this.alertTheme.background,
      iconColor: this.alertTheme.iconColor,
      showCancelButton: true,
      confirmButtonColor: this.alertTheme.confirmButtonColor,
      cancelButtonColor: this.alertTheme.cancelButtonColor,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.logout();
        this.router.navigate(['/login']);
      }
    });
  }
}
