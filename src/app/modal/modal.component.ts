import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { Router } from '@angular/router';
import { Board } from '../models/board.model';
import { Column } from '../models/column.model';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: [
    '../main/main.component.scss', 
    './modal.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent extends MainComponent implements OnInit {


  @Input() type?: string;

  @Input() boardList?: Board[];

  @Input() board?: Board;
  @Input() column?: Column;
  @Input() task?: Task;

  @Output() newBoardAdded = new EventEmitter();
  // modify board (board)
  // rename column modal (column)
  // edit task (task)
  // null current board (null)

  // event emitter, on new board, update parent

  constructor(private route: Router) {
    super(route);
  }

  onNewBoard() {
    this.newBoardAdded.emit();
  }

  show() {
    console.log(this.type);
    console.log(this.board);
    console.log(this.column);
    console.log(this.task);
  }

}
