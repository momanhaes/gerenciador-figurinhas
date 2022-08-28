import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { WindowService } from 'src/app/services/window.service';
import { APPEARD } from 'src/app/animations/appeard.animation';
import { IUser } from 'src/app/services/user.service';
import { ALERT_THEME } from 'src/app/utils/theme';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  animations: [APPEARD],
})
export class ProfileFormComponent implements OnInit {
  @Output() edit = new EventEmitter();
  @Output() exit = new EventEmitter();
  @Input() profileForm!: FormGroup;
  @Input() isLoading!: boolean;
  @Input() profile!: IUser;
  
  public subscribeMobile!: Subscription;
  public sameValue: boolean = false;
  public alertTheme = ALERT_THEME;
  public isMobile!: boolean;
  public state = 'ready';

  constructor(private windowService: WindowService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.subscribeMobile = this.windowService.isMobile.subscribe((isMobile: boolean) => (this.isMobile = isMobile));
    this.profileForm.valueChanges.subscribe(() => this.validateIsEqual());
    this.validateIsEqual();
  }

  public showError(error: any): void {
    this.notificationService.showModal(
      'Ops!',
      error ? error : 'Ocorreu um erro.',
      'error',
      'Ok'
    );
  }

  validateIsEqual(): void {
    this.sameValue = this.profile?.name === this.profileForm?.value.name;
  }

  editProfile() {
    this.validateIsEqual();
    
    if (!this.sameValue) {
      return this.edit.emit();
    }

    this.showError('Não há alterações para serem salvas.');
  }

  exitProfile() {
    this.exit.emit();
  }
}
