import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WindowService } from 'src/app/services/window.service';
import { APPEARD } from 'src/app/animations/appeard.animation';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  animations: [APPEARD],
})
export class LoginFormComponent implements OnInit {
  @Output() register = new EventEmitter();
  @Output() login = new EventEmitter();
  @Input() loginForm!: FormGroup;
  @Input() isLoading!: boolean;

  public subscribeMobile!: Subscription;
  public isMobile!: boolean;
  public logoClass!: string;
  public state = 'ready';

  constructor(private windowService: WindowService) { this.isMobile = window.innerWidth <= windowService.widthMobile; }

  ngOnInit() {
    this.subscribeMobile = this.windowService.isMobile.subscribe((isMobile: boolean) => (this.isMobile = isMobile));
    this.logoClass = 'fa fa-sticky-note-o fa-flip-horizontal mr-2';
  }

  goRegister() {
    this.register.emit();
  }

  doLogin() {
    this.login.emit();
  }

  mouseEnter() {
    this.logoClass = 'fa fa-sticky-note fa-flip-horizontal mr-2';
  }

  mouseLeave() {
    this.logoClass = 'fa fa-sticky-note-o fa-flip-horizontal mr-2';
  }
}
