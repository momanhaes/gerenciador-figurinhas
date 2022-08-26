import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { ISticker } from '../../components/sticker/sticker.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  public value: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ISticker,
    private dialogService: DialogService
  ) {}

  ngOnInit() {}

  getValue(qtde: number | null) {
    if (qtde) this.value = qtde;
  }

  apply() {
    this.dialogService.updateSticker(this.data, this.value);
  }
}
