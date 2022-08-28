import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WindowService } from 'src/app/services/window.service';
import { APPEARD } from 'src/app/animations/appeard.animation';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  animations: [APPEARD],
})
export class RegisterFormComponent implements OnInit {
  @Output() register = new EventEmitter();
  @Output() login = new EventEmitter();
  @Input() registerForm!: FormGroup;
  @Input() isLoading!: boolean;
  
  public subscribeMobile!: Subscription;
  public logoClass!: string;
  public isMobile!: boolean;
  public state = 'ready';

  constructor(private windowService: WindowService) { this.isMobile = window.innerWidth <= windowService.widthMobile; }

  ngOnInit() {
    this.subscribeMobile = this.windowService.isMobile.subscribe((isMobile: boolean) => (this.isMobile = isMobile));
    this.logoClass = 'fa fa-sticky-note-o fa-flip-horizontal mr-2';
  }

  goLogin() {
    this.login.emit();
  }

  doRegister() {
    this.register.emit();
  }

  mouseEnter() {
    this.logoClass = 'fa fa-sticky-note fa-flip-horizontal mr-2';
  }

  mouseLeave() {
    this.logoClass = 'fa fa-sticky-note-o fa-flip-horizontal mr-2';
  }
}
