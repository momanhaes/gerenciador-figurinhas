import { KeyType, LocalStorageService } from 'src/app/services/local-storage.service';
import { ISection, ISticker } from 'src/app/components/sticker/sticker.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { SectionService } from 'src/app/services/section.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ALERT_THEME } from 'src/app/utils/theme';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Output() public resetEvent = new EventEmitter<ISection[]>();
  @Input() public stickers: ISticker[] = [];
  @Input() public sections: ISection[] = [];
  
  public stickerForm!: FormGroup;
  public alertTheme = ALERT_THEME;

  constructor(
    private sectionService: SectionService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService
    ) {}

  ngOnInit() {
    this.initForm();
    this.sectionService.notifier.subscribe(() => this.updateStickers());
  }

  initForm(): void {
    this.stickerForm = new FormGroup({ stickerControl: new FormControl('') });
  }

  getMissing(): number {
    return this.stickers.filter((item) => item.qtde === 0).length;
  }

  getCollected(): number {
    return this.stickers.filter((item) => item.qtde > 0).length;
  }

  getCollectPercent(): number {
    return (this.getCollected() * 100) / this.stickers.length;
  }

  getMissingPercent(): number {
    return 100 - this.getCollectPercent();
  }

  updateStickers(): void {
    this.getMissing();
    this.getCollected();
    this.getCollectPercent();
    this.getMissingPercent();
    this.localStorageService.set(KeyType.DATA, this.sections);
  }

  confirmReset(): void {
    this.resetEvent.emit();
    this.updateStickers();

    this.notificationService.showModal(
      'Sucesso!',
      'Você redefiniu seu progresso.',
      'success',
      'Ok'
    );
  }

  resetData(): void {
    Swal.fire({
      title: 'Você escolheu redefinir o progresso.',
      text: 'Deseja mesmo remover todas as figurinhas?',
      icon: 'warning',
      background: this.alertTheme.background,
      iconColor: this.alertTheme.iconColor,
      showCancelButton: true,
      confirmButtonColor: this.alertTheme.confirmButtonColor,
      cancelButtonColor: this.alertTheme.cancelButtonColor,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) this.confirmReset();
    });
  }
}
