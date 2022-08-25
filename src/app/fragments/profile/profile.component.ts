import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() public profile!: IUser;

  constructor() {}

  ngOnInit() {}
}
