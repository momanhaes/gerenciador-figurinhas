import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { DialogComponent } from '../../fragments/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ISticker } from './sticker.interface';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.scss'],
})
export class StickerComponent implements OnInit {
  @Output() toggleEvent = new EventEmitter<ISticker>();
  @Input() isRepeated: boolean = false;
  @Input() sticker!: ISticker;

  constructor(
    public dialog: MatDialog,
    private dialogService: DialogService,
    private sectionService: SectionService
  ) {}

  ngOnInit() {
    this.dialogService.notifier.subscribe(
      (data: { sticker: ISticker; qtde: number }) => {
        if (data.sticker.code === this.sticker.code) {
          this.sticker.qtde = data.qtde;
          this.sectionService.updateStickers();
          this.dialog.closeAll();
        }
      }
    );
  }

  toggleSticker(sticker: ISticker): void {
    this.dialog.open(DialogComponent, { data: sticker });
  }

  getBadge(qtde: number): any {
    if (qtde > 1 && !this.isRepeated) {
      return qtde;
    }

    if (qtde > 1 && this.isRepeated) {
      return qtde - 1;
    }
  }

  isActive(number: number): boolean {
    return number > 0;
  }
}
