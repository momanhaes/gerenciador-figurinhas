import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { APPEARD } from 'src/app/animations/appeard.animation';
import { IUser, UserService } from 'src/app/services/user.service';
import { SECTIONS } from 'src/app/components/sticker/stickers.data';
import { COLLAPSIBLE } from 'src/app/animations/collapsible.animation';
import { KeyType, LocalStorageService } from 'src/app/services/local-storage.service';
import { ISection, ISticker, SectionType } from 'src/app/components/sticker/sticker.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [APPEARD, COLLAPSIBLE],
})
export class HomeComponent implements OnInit {
  public state = 'ready';
  public profile!: IUser;
  public stickerForm!: FormGroup;
  public sections: ISection[] = [];
  public stickers: ISticker[] = [];
  public isUserLoading: boolean = false;
  public panelOpenState: boolean = false;

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {}

  public get collected(): number {
    return this.stickers.filter(item => item.active).length;
  }

  public get missing(): number {
    return this.stickers.filter(item => !item.active).length;
  }

  public get collectPercent(): number {
    return ((this.collected * 100) / this.stickers.length);
  }

  public get missingPercent(): number {
    return 100 - this.collectPercent;
  }

  ngOnInit() {
    this.stickerForm = new FormGroup({ stickerControl: new FormControl('') });
    this.getUser();
    this.getSections();
    this.getStickers();
  }

  getUser(): void {
    this.profile = this.userService.getUser();
  }

  getSections(): void {
    const DATA = this.localStorageService.get(KeyType.DATA);

    if (DATA) { this.sections = DATA; } else {
      this.localStorageService.set(KeyType.DATA, SECTIONS);
      this.getSections();
    }
  }

  getStickers(): void {
    const specialStickers = this.sections.find(item => item.name === SectionType.ESPECIAIS)?.stickers;
    const timeLineStickers = this.sections.find(item => item.name === SectionType.TEMPO)?.stickers;

    const groups = this.sections.find(item => item.name === SectionType.PAISES)?.group;
    const countries = groups?.map(item => item.country);

    let countryStickers: ISticker[] = [];

    countries?.map(item => item?.map(item => countryStickers.push(...item.stickers)));

    let allStickers: ISticker[] = [];

    if (specialStickers && timeLineStickers && countryStickers) {
      allStickers = [
        ...specialStickers,
        ...countryStickers,
        ...timeLineStickers,
      ];
    }

    this.stickers = allStickers;

  }

  updateSticker() {
    this.localStorageService.set(KeyType.DATA, this.sections);
  }
}
