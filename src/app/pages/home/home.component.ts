import { Component, OnInit } from '@angular/core';
import { ALERT_THEME } from 'src/app/utils/theme';
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
  public sections: ISection[] = [];
  public stickers: ISticker[] = [];
  public alertTheme = ALERT_THEME;
  public loading: boolean = true;
  public panelOpenState: boolean = false;

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit() {
    setTimeout(() => { 
      this.getData();
      this.loading = false; 
    }, 500)
  }

  getData(): void {
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

  resetData(): void {
    this.localStorageService.clear();
    this.getSections();
    this.getStickers();
  }
}
