import { EventEmitter, Injectable } from '@angular/core';
import { ISticker } from '../components/sticker/sticker.interface';

@Injectable({ providedIn: 'root' })
export class SectionService {
  public notifier = new EventEmitter<ISticker[]>();

  constructor() {}

  public updateStickers(): void {
    this.notifier.emit();
  }
}
