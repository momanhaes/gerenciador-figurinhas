import { Component, Input, OnInit } from '@angular/core';
import { ISection } from 'src/app/components/sticker/sticker.interface';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  @Input() public sections: ISection[] = [];

  constructor(private sectionService: SectionService) {}

  ngOnInit() {}

  updateStickers() {
    this.sectionService.updateStickers();
  }
}
