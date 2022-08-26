import { EventEmitter, Injectable } from '@angular/core';
import { ISticker } from '../components/sticker/sticker.interface';

@Injectable({ providedIn: 'root' })
export class DialogService {
  public notifier = new EventEmitter<{ sticker: ISticker; qtde: number }>();

  constructor() {}

  public updateSticker(sticker: ISticker, qtde: number): void {
    this.notifier.emit({ sticker, qtde });
  }
}
