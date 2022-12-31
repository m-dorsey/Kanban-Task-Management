import { Component, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { Board } from '../models/board.model';
import { Column } from '../models/column.model';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: [
    '../main/main.component.scss', 
    './board.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class BoardComponent extends MainComponent {

  @ViewChild(ModalComponent) modal ?: ModalComponent;

  @Input() board?: Board;

  currentModal ?: string;
  currentColumn?: Column;



  /**
   * 
   * move code from main to board if fitting
   * column, task components
   * modals separation
   * 
   */
  
  constructor(private route: Router) {
    super(route);
  }

  setCurrentModal(type: string) {

    switch(type) {

      case "column":
        this.currentModal = 'column';
        this.modal?.toggleModal('rename-column-modal');
        break;

      default:
        this.currentModal = 'none';

    }

  } // setCurrentModal

  setCurrentColumn(column: Column) {
    this.currentColumn = column;
  } // setCurrentColumn

  onColumnRenamed(name: string) {
    this.currentColumn!.name = name;
  } // onColumnRenamed

  
}
