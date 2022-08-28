import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { DialogService } from 'src/app/services/dialog.service';
import { WindowService } from 'src/app/services/window.service';
import { ISticker } from '../../components/sticker/sticker.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  public subscribeMobile!: Subscription;
  public isMobile!: boolean;
  public value: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ISticker,
    private windowService: WindowService,
    private dialogService: DialogService
  ) {
    this.isMobile = window.innerWidth <= windowService.widthMobile;
  }

  public get title(): string {
    return this.isMobile
      ? 'Arraste para definir a quantidade e clique no ícone ao lado para confirmar.'
      : 'Arraste para definir a quantidade e <br> clique no ícone ao lado para confirmar.';
  }

  ngOnInit() {
    this.subscribeMobile = this.windowService.isMobile.subscribe(
      (isMobile: boolean) => (this.isMobile = isMobile)
    );
  }

  getValue(qtde: number | null) {
    if (qtde) this.value = qtde;
  }

  apply() {
    this.dialogService.updateSticker(this.data, this.value);
  }
}
