import { Component, OnInit } from '@angular/core';
import { Board } from '../models/board.model';
import { Column } from '../models/column.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
      
  }

  board: Board = new Board('Test Board', [
    new Column('Ideas', [
      "Lionel",
      "Messi"
    ]),
    new Column('To Do', [
      "Julian",
      "Alvarez"
    ]),
    new Column('Done', [
      "Angel",
      "Di Maria"
    ])
  ]);

}
