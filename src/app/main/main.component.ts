import { Component, OnInit } from '@angular/core';
import { Board } from '../models/board.model';
import { Column } from '../models/column.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // variables
  boards: Board[] = [];
  currentBoard?: Board;

  constructor() {
    this.initBoards();
  }

  ngOnInit(): void {
      
  }

  sidebarToggle() {
    // var elem = (document.getElementById("sidebar")?.classList);
    // var toggle = <HTMLElement>document.getElementById("root");
    

    // if (elem?.contains("show")) {
      

    //   toggle.dataset["bsToggle"] = "collapse";
    //   toggle.dataset["bsTarget"] = "#sidebar";
    //   elem.remove("show");

    // }
   

  }

  initBoards() {

    // show no columns if board not set
    if (this.currentBoard == undefined) {
      console.log("NO SET BOARD");
    } else {
      console.log("SET BOARD", this.currentBoard);
    }

    console.log(this.currentBoard);

    var board: Board = new Board('Test Board', [
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
    
    this.boards.push(board);
  }

  addNewBoard() {
    console.log("Add new board");
    var b = new Board("Hey", [
      new Column ("New Board", [
        "Task 1",
        "Task 2"
      ])
    ]);
    this.boards.push(b);
  }

  setCurrentBoard(board: Board) {
    console.log("set", board);

    // set current board, get DOM
    this.currentBoard = board;
    var elements = <HTMLCollection> (document.getElementById("sidebar-nav")?.children);
    
    // remove active from all other children
    for (let i = 0; i < elements.length-1; i++) {
      (elements.item(i)?.classList.remove("active"));
    }

    // highlight list item as active
    var index = this.boards.indexOf(board);
    var boardElem = (elements?.item(index));
    (boardElem?.classList.add("active"));

    this.initBoards();

  }

  deleteBoard(board: Board) {
    console.log("delete", board);
    var index = (this.boards.indexOf(board));
    (this.boards.splice(index, 1));
  }

  

}
