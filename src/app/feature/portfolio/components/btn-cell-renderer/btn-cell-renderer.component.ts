import { Component, OnInit } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-btn-cell-renderer',
  templateUrl: './btn-cell-renderer.component.html',
  styleUrls: ['./btn-cell-renderer.component.scss']
})
export class BtnCellRendererComponent implements OnInit {

  params: any;
  rowData: any;

  constructor() { }

  ngOnInit(): void {
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.rowData = params.data;
  }

  onEdit() {
    this.params?.editBtn(this.rowData);
  }

}
