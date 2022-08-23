import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { APPEARD } from 'src/app/animations/appeard.animation';
import { IUser, UserService } from 'src/app/services/user.service';
import { COLLAPSIBLE } from 'src/app/animations/collapsible.animation';
import { ISection } from 'src/app/components/sticker/sticker.interface';
import { SECTIONS_MOCK } from 'src/app/components/sticker/stickers.mock';

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
  public isUserLoading: boolean = false;
  public panelOpenState: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.stickerForm = new FormGroup({ stickerControl: new FormControl('') });
    this.getUser();
    this.getSections();
  }

  getUser(): void {
    this.profile = this.userService.getUser();
  }

  getSections(): void {
    this.sections = SECTIONS_MOCK;
  }
}
