import { Component, OnInit } from '@angular/core';
import { Board } from '../models/board.model';
import { Column } from '../models/column.model';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // variables
  boards: Board[] = [];
  currentBoard?: Board;
  currentColumn?: Column;

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
   * - refactor: load last board clicked
   * 
   * boards
   * - modification impl
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

    var b = new Board("New Board", [
      new Column("New List", [
        new Task("Task 1"),
        new Task("Task 2")
      ])
    ]);
    this.boards.push(b);

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
    var b = new Board("New Board", [
      new Column ("New List", [
        new Task("Task 1"),
        new Task("Task 2")
      ])
    ]);
    this.boards.push(b);

  }

  modifyBoard(board: Board, mod: string) {

    if (mod == "board name") {

      var input = <HTMLInputElement> (document.getElementById("new-board-name"));
      // save board name 
      board.name = input.value;
      // reset input
      input.value = "";

    } else if (mod == "board description") {

      var desc = <HTMLInputElement> (document.getElementById('board-description'));
      console.log(desc.value);
      desc.value = "";

    } else if (mod == "clear all") {
      
      var delBtnText = <string> (document.getElementById('delete-board-contents')?.textContent);

      switch (delBtnText) {
        case "Delete Tasks":
          console.log("Delete tasks");
          break;

        case "Delete Lists":
          console.log("delete lists");
          break;

        case "Clear All":
          console.log("clear all");
          break;

      }
    
    }

    
  }

  modifyBoardToggleValidation(section: string) {
    
    switch (section) {
      case "board name":
        
        var input = <HTMLInputElement> (document.getElementById("new-board-name"));
        var saveBtnDisable = <HTMLElement> document.getElementById("save-board-name");

        if (input.value == "") {
          saveBtnDisable.classList.add('disabled');
        } else {
          saveBtnDisable.classList.remove('disabled');
        }

        break;

      case "board description":
        
        var desc = <HTMLInputElement> document.getElementById('board-description');
        var saveBtnDisable = <HTMLElement>document.getElementById("save-board-description");
        
        if (desc.value == "") {
          saveBtnDisable.classList.add('disabled');
        } else {
          saveBtnDisable.classList.remove('disabled');
        }

        break;

      case "board template":
        
        console.log("board template");
        
        break;

      case "clear all":
        
        var tabs = <HTMLCollection> (document.getElementById('clear-board-tabs')?.children);
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].children[0].classList.contains('active')) {
            
            var delBtn = <HTMLElement> document.getElementById('delete-board-contents');
            if (tabs[i].textContent == "Clear All") {
              (delBtn.innerText) = "" + tabs[i].textContent;
            } else {
              (delBtn.innerText) = "Delete " + tabs[i].textContent;
            }
          
          }
        }
        
        break;

    }

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

  closeModifyBoardModal() {
    var elements = <HTMLCollection> (document.getElementById("accordion")?.children);
    for (let i = 0; i < elements.length; i++) {
      (elements[i].children[1].classList.remove('show'));
    }
  }

  addTask(board: Board, column: Column) {
    column.tasks.push(
      new Task("New Task")
      );
  }

  deleteTask(board: Board, column: Column, task: Task) {

  }


  setCurrentColumn(board: Board, column:Column) {
    this.currentColumn = column;
  }

  renameColumn(event?: string) {

    var input = <HTMLInputElement> (document.getElementById('rename-column'));
    var saveBtn = <HTMLElement> (document.getElementById('rename-column-save'));

    switch(event) {

      case "close":
          input.value = "";
        break;

      case "save":

          if (this.currentColumn != null) {
            this.currentColumn.name = input.value;
            
          }
          input.value = "";

        break;

      default:

        if (input.value == "") {
          saveBtn.classList.add('disabled');
        } else {
          saveBtn.classList.remove('disabled');
        }


        break;

    }

  }

  addColumn(board: Board) {
    board.columns.push(
      new Column ('New List', [])
    );
  }

  deleteColumn(board: Board, column: Column) {
    var index = (board.columns.indexOf(column));
    board.columns.splice(index, 1);
  }

  

}
