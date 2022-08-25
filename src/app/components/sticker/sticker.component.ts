import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISticker } from './sticker.interface';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.scss'],
})
export class StickerComponent implements OnInit {
  @Output() toggleEvent = new EventEmitter<ISticker>();
  @Input() sticker!: ISticker;

  constructor() {}

  ngOnInit() {}

  toggleSticker(): void {
    this.sticker.qtde++;
    this.toggleEvent.emit();
  }

  getBadge(qtde: number): any {
    if (qtde > 1) return qtde;
  }

  isActive(number: number): boolean {
    return number > 0;
  }
}
