import { KeyType, LocalStorageService } from 'src/app/services/local-storage.service';
import { ISection, ISticker } from 'src/app/components/sticker/sticker.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { SECTIONS } from 'src/app/components/sticker/stickers.data';
import { SectionService } from 'src/app/services/section.service';
import { APPEARD } from 'src/app/animations/appeard.animation';
import { FormControl, FormGroup } from '@angular/forms';
import { ALERT_THEME } from 'src/app/utils/theme';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [APPEARD]
})
export class MenuComponent implements OnInit {
  @Output() public resetEvent = new EventEmitter<ISection[]>();
  @Input() public stickers: ISticker[] = [];
  @Input() public sections: ISection[] = [];
  
  public collected: ISticker[] = [];
  public missing: ISticker[] = [];
  public repeated: ISticker[] = [];

  public state: string = 'ready';
  public alertTheme = ALERT_THEME;
  
  public collectedForm: FormGroup = new FormGroup({ collected: new FormControl('') });
  public missingForm: FormGroup = new FormGroup({ missing: new FormControl('') });
  public repeatedForm: FormGroup = new FormGroup({ repeated: new FormControl('') });

  constructor(
    private sectionService: SectionService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.sectionService.notifier.subscribe(() => this.updateStickers());
    this.filterStickers();
    this.getStickersCollected();
    this.getStickersMissing();
    this.getStickerRepeated();
  }

  filterStickers(): void {
    this.collectedForm.valueChanges.subscribe((text) => {
      this.getStickersCollected();

      const result: ISticker[] = this.collected.filter((item) => item.code?.toUpperCase().includes(text.collected.toUpperCase()));
      this.collected = result;
    });

    this.missingForm.valueChanges.subscribe((text) => {
      this.getStickersMissing();

      const result: ISticker[] = this.missing.filter((item) => item.code?.toUpperCase().includes(text.missing.toUpperCase()));
      this.missing = result;
    });
    
    this.repeatedForm.valueChanges.subscribe((text) => {
      this.getStickerRepeated();

      const result: ISticker[] = this.repeated.filter((item) => item.code?.toUpperCase().includes(text.repeated.toUpperCase()));
      this.repeated = result;
    });
  }

  getTotal(): number {
    return this.stickers.filter((item) => item.qtde > 0).reduce((acc, obj) => acc + obj.qtde, 0);
  }

  getMissing(): number {
    return this.stickers.filter((item) => item.qtde === 0).length;
  }

  getMissingList(): ISticker[] {
    return this.stickers.filter((item) => item.qtde === 0);
  }

  getCollectedList(): ISticker[] {
    return this.stickers.filter((item) => item.qtde > 0);
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

  getStickersCollected(): ISticker[] {
    return this.collected = this.getCollectedList();
  }

  getStickersMissing(): ISticker[] {
    return this.missing = this.getMissingList();
  }

  getStickerRepeated(): ISticker[] {
    return this.repeated = this.stickers.filter((item) => item.qtde > 1);
  }

  getRepeatedTotal(): number {
    const stickers = this.repeated
      .filter((item) => item.qtde > 1)
      .map((item) => {
        return {
          code: item.code,
          qtde: item.qtde - 1,
        };
      });

    return stickers.reduce((acc, obj) => acc + obj.qtde, 0);
  }

  clearTemporary(): void {
    this.collected = [];
    this.missing = [];
    this.missing = this.stickers;
  }

  clearForms(): void {
    this.collectedForm.reset({ collected: '' });
    this.missingForm.reset({ missing: '' });
    this.repeatedForm.reset({ repeated: '' });
  }

  updateStickers(): void {
    this.getMissing();
    this.getCollected();
    this.getCollectPercent();
    this.getMissingPercent();
    this.getStickerRepeated();
    this.getStickersCollected();
    this.getStickersMissing();
    this.getRepeatedTotal();
    this.clearForms();
    this.localStorageService.set(KeyType.DATA, this.sections);
  }

  confirmReset(): void {
    this.resetEvent.emit();
    this.sections = SECTIONS;
    this.clearTemporary();
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
