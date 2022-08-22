import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public class!: string;

  constructor() {}

  ngOnInit() {
    this.class = 'fa fa-sticky-note fa-flip-horizontal mr-2';
  }

  public mouseEnter() {
    this.class = 'fa fa-sticky-note-o fa-flip-horizontal mr-2';
  }

  public mouseLeave() {
    this.class = 'fa fa-sticky-note fa-flip-horizontal mr-2';
  }
}
