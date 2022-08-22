import { Component, OnInit } from '@angular/core';
import { APPEARD } from 'src/app/animations/appeard.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [APPEARD],
})
export class HomeComponent implements OnInit {
  public state = 'ready';

  constructor() {}

  ngOnInit() {}
}
