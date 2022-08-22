import { EventEmitter, Injectable } from '@angular/core';

export enum LanguageType {
  PT = 'PT',
  EN = 'EN',
}

@Injectable({ providedIn: 'root' })
export class LanguageService {
  public notifier = new EventEmitter<any>();

  constructor() {}

  public updateLanguage(language: any): void {
    this.notifier.emit(language);
  }
}
