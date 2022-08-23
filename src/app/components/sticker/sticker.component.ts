import { Component, Input, OnInit } from '@angular/core';
import { ISticker } from './sticker.interface';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.scss'],
})
export class StickerComponent implements OnInit {
  @Input() sticker!: ISticker;

  constructor() { }

  ngOnInit() {
  }

  toggleSticker(): void {
    this.sticker.active = !this.sticker.active;
  }

}
