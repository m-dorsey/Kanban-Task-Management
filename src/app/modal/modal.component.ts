import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { Router } from '@angular/router';
import { Board } from '../models/board.model';
import { Column } from '../models/column.model';
import { Task } from '../models/task.model';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: [
    '../main/main.component.scss', 
    './modal.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent extends MainComponent{


  @Input() type?: string;

  @Input() boardList?: Board[];

  @Input() board?: Board;
  @Input() column?: Column;
  @Input() task?: Task;

  @Output() newBoardAdded = new EventEmitter();
  @Output() columnRenamed = new EventEmitter<string>();
  // modify board (board)
  // rename column modal (column)
  // edit task (task)
  // null current board (null)

  // event emitter, on new board, update parent

  onNewBoard() {
    this.newBoardAdded.emit();
  } // onNewBoard

  onRenameColumn(action?: string) {
    
    var input = <HTMLInputElement> document.getElementById('rename-column');
    var saveBtn = <HTMLElement> document.getElementById('rename-column-save');

    switch(action) {
      
      case "close":
        input.value = '';
        break;    

      case "save":
        if (input.value.trim() != '') {
          this.columnRenamed.emit(input.value);
        }
        input.value = '';
        break;

      default:
        if (input.value.trim() == "") {
          saveBtn.classList.add('disabled');
        } else {
          saveBtn.classList.remove('disabled');
        }
        break;

    }

  } // onRenameColumn


  toggleModal(id: string) {
    
    var elem = <HTMLElement> document.getElementById(id);
    if (elem.classList.contains('d-block')) {
      elem.classList.remove('d-block');
      elem.classList.remove('position-absolute');
    } else {
      elem.classList.add('d-block');
      elem.classList.add('position-absolute');
    }
    
  } // toggleModal

}
