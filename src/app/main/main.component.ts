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

  // infoBoard: Board = new Board("Info", [
  //   new Column("Fun Facts", [
  //     "Sliced bread was first manufactured by machine and sold in the 1920s by the Chillicothe Baking Company in Missouri",
  //     "The Four Corners is the only spot in the US where you can stand in four states at once: Utah, Colorado, Arizona and New Mexico.",
  //     "Bats are the only mammal that can actually fly.",
  //     "Flamingoes are only pink because of chemicals called carotenoids in the algae and fish (which also eat the algae) they eat.",
  //   ]),
  //   new Column("Words of the Day", [
  //     "Oblivion",
  //     "Putative",
  //     "Undulate"
  //   ]),
  //   new Column("To Do", ["hi"])
  // ]);

  // currentBoard: Board = this.infoBoard;

  /**
   * modal
   * - on load, create new board
   *   or select existing
   * - refactor: load last board clicked
   * 
   * boards
   * - rename
   * - on delete, show model or select board notice
   * 
   * refactor
   * - local storage migration
   * - animated background
   */

  constructor() {
    this.initBoards();
    
  }

  ngOnInit(): void {
      
  }

  initBoards() {

    // show no columns if board not set
    // if (this.currentBoard == this.infoBoard) {

    //   // info board
    //   this.boards.push(this.infoBoard);


    // } else {
    //   console.log("SET BOARD", this.currentBoard);

    // }


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
    for (let i = 0; i < elements.length; i++) {
      (elements.item(i)?.classList.remove("active"));
    }

    // highlight list item as active
    var index = this.boards.indexOf(board) + 1;
    var boardElem = (elements?.item(index));
    (boardElem?.classList.add("active"));

  }

  deleteBoard(board: Board) {
    console.log("delete", board);

    var index = (this.boards.indexOf(board));
    (this.boards.splice(index, 1));

    if (board == this.currentBoard) {
      this.currentBoard = undefined;
    }

  }

  

}
