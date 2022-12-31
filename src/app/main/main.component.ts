import { Component } from '@angular/core';
import { Board } from '../models/board.model';
import { Column } from '../models/column.model';
import { Task } from '../models/task.model';
import { Checklist } from '../models/checklist.model';
import { ChecklistItem } from '../models/checklistItem.model';

import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  // variables
  boards: Board[] = [];
  currentBoard?: Board;
  currentTask?: Task;

  /**
   * modal
   * - refactor: load last board clicked
   * 
   * features
   * - universal styling
   * - search feature
   * - settings menu activity
   * 
   * refactor
   * - separation of concerns
   * - child elem click != parent event fires
   * - local storage migration
   * - animated background
   */

  constructor(private router: Router) {
    this.initBoards();  
  }

  initBoards() {

    var b = new Board("New Board", [
      new Column("New List", [
        new Task("Task 1"),
        new Task("Task 2")
      ])
    ]);

    b.setDescription("hi");

    b.columns[0].tasks[0].setDescription("hi");

    b.columns[0].tasks[0].checklists = [
      new Checklist('Checklist')
    ];

    b.columns[0].tasks[0].checklists[0].items = [
      new ChecklistItem('Item 1'),
      new ChecklistItem('Item 2'),
      new ChecklistItem('Item 3')
    ];

    b.columns[0].tasks[0].setDate(new Date());
    
    this.boards.push(b);

  } // initBoards

  onBoardAdded() {
    // console.log("update Boards", event);
    // this.boards.push(event);
    this.addNewBoard();
  }

  adjustSidebar() {

    var sidebarColumn = <HTMLElement> (document.getElementById('sidebar-col'));
    var sidebar = <HTMLElement> document.getElementById('sidebar');

    // setTimeout(() => {

    //   console.log("timeout");
    //   console.log(sidebar.classList);
    //   if (sidebar.classList.contains('show')) {

    //     // sidebarColumn.style.minWidth = '275px';
    //     // (sidebarColumn.classList).remove('col-auto');
    //     // (sidebarColumn.classList).add('col-4');

    //   } else {
        
    //     // sidebarColumn.style.minWidth = '0px';
    //     // (sidebarColumn.classList).add('col-auto');
    //     // (sidebarColumn.classList).remove('col-4');

    //   }

    // }, 360);
    
  } // adjustSidebar

  addNewBoard() {

    var b = new Board("New Board", [
      new Column ("New List", [
      ])
    ]);
    
    this.boards.push(b);

    console.log(this.boards);

  } // addNewBoard

  modifyBoard(board: Board, mod: string) {

    if (mod == "board name") {

      var input = <HTMLInputElement> (document.getElementById("new-board-name"));
      // save board name 
      board.name = input.value;
      // reset input
      input.value = "";

    } else if (mod == "board description") {

      var desc = <HTMLInputElement> (document.getElementById('board-description'));
      // console.log(desc.value);
      board.setDescription(desc.value);
      // desc.value = "";

    } else if (mod == "clear all") {
      
      var delBtnText = <string> (document.getElementById('delete-board-contents')?.textContent);

      switch (delBtnText) {
        case "Delete Tasks":
          // console.log("Delete tasks");
          for (var col of board.columns) {
            while (col.tasks.length > 0) {
              col.tasks.pop();
            }
          }

          break;

        case "Delete Lists":
          //console.log("delete lists");
          while (board.columns.length > 0) {
            board.columns.pop();
          }

          break;

        case "Clear All":
          // console.log("clear all");
          while (board.columns.length > 0) {
            board.columns.pop();
          }
          board.clearDescription();
          break;

      }
    
    }

    
  } // modifyBoard

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

      case "clear board description":

        var desc = <HTMLInputElement>document.getElementById('board-description');
        var saveBtnDisable = <HTMLElement>document.getElementById("save-board-description");
        
        desc.value = "";
        if (this.currentBoard != null) {
          this.currentBoard.description = "";
          saveBtnDisable.classList.add('disabled');
        }
        console.log("clear board desc", this.currentBoard);
        
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

  } // modifyBoardToggleValidation

  setCurrentBoard(board: Board) {

    // set current board, get DOM
    this.currentBoard = board;
    
    var elements = <HTMLCollection> (document.getElementById("sidebar-nav")?.children);
    console.log(elements);
    // // remove active from all other children
    for (let i = 0; i < elements.length; i++) {
      (elements.item(i)?.classList.remove("active"));
    }

    // // highlight list item as active
    var index = this.boards.indexOf(board) + 1;
    var boardElem = (elements?.item(index));
    (boardElem?.classList.add("active"));

  } // setCurrentBoard

  getCurrentBoard() {
    return this.currentBoard;
  }

  deleteBoard(board: Board) {

    var index = (this.boards.indexOf(board));
    (this.boards.splice(index, 1));

    if (board == this.currentBoard) {
      this.currentBoard = undefined;
    }

  } // deleteBoard

  closeModifyBoardModal() {
    var elements = <HTMLCollection> (document.getElementById("accordion")?.children);
    for (let i = 0; i < elements.length; i++) {
      (elements[i].children[1].classList.remove('show'));
    }
  } // closeModifyBoardModal

  setCurrentTask(task: Task) {
    this.currentTask = task;
  } // setCurrentTask

  editTask(event: string) {

    var txtArea = <HTMLElement>document.getElementById('edit-task-description-input');
    var elem = <HTMLInputElement> document.getElementById('edit-task-description-input');
    var saveBtn = <HTMLElement> document.getElementById('edit-task-description-save');

    switch (event) {

      case 'description':
        
        if (elem.value != "") {
          saveBtn.classList.remove('disabled');
        } else {
          saveBtn.classList.add('disabled');
        }
        break;

      case 'cancel':

        elem.value = <string> this.currentTask?.description;

        break;

      case 'save':
        this.currentTask?.setDescription(elem.value);
        console.log(this.currentTask);
        break;

      case 'resize':
        console.log('enter');
        // txtArea.style.cssText = 'height:' + txtArea.scrollHeight + 'px';
        // console.log(txtArea.clientHeight);
        // console.log(txtArea.scrollHeight);
        

        break;

      case "name":
        
        var title = <HTMLElement> document.getElementById('edit-task-title');

        if (title.textContent?.trim() != "" && this.currentTask != null) {
          this.currentTask.name = <string>title.textContent?.trim();
        }

        break;

      case 'clear':

        elem.value = '';
        if (this.currentTask != null ) {
          this.currentTask.description = '';
        }
        saveBtn.classList.add('disabled');

        break;

    }

  } // editTask

  toggleTaskActions(section: string) {

    var label = <HTMLElement> document.getElementById('label-assignment');
    var checklist = <HTMLElement> document.getElementById('checklist-assignment');
    var date = <HTMLElement> document.getElementById('date-assignment');

    switch(section) {

      case "label":

        checklist.classList.add('collapsing');
        date.classList.add('collapsing');
        checklist.classList.remove('show');
        date.classList.remove('show');

        setTimeout(() => {
          checklist.classList.remove('collapsing');
          date.classList.remove('collapsing');
        }, 2500);

        
        
        break;

      case "checklist":

        label.classList.add('collapsing');
        date.classList.add('collapsing');
        label.classList.remove('show');
        date.classList.remove('show');

        setTimeout(() => {
          label.classList.remove('collapsing');
          date.classList.remove('collapsing');
        }, 2500);

        break;

      case "date":

        label.classList.add('collapsing');
        checklist.classList.add('collapsing');
        label.classList.remove('show');
        checklist.classList.remove('show');

        setTimeout(() => {
          label.classList.remove('collapsing');
          checklist.classList.remove('collapsing');
        }, 3500);

        break;

        default:
          label.classList.remove('show');
          checklist.classList.remove('show');
          date.classList.remove('show');
          break;

    }

  } // toggleTaskActions

  addLabel(task: Task) {
    var input = <HTMLInputElement> document.getElementById('label-input');
    
    if (input.value.trim() != "") {
      task.addLabel(input.value.trim());
      // console.log(task);
    }

    input.value = '';

  } // addLabel

  addChecklist(task: Task) {
    var input = <HTMLInputElement>document.getElementById('checklist-title-input');
    if (input.value.trim() != "") {
      task.addChecklist(input.value.trim());
      // console.log(input.value);
      console.log(task);
    }

    input.value = '';
  } // addChecklist

  addChecklistItem(task: Task, checklist: Checklist) {

    var index = task.checklists.indexOf(checklist);
    var input = <HTMLInputElement> document.getElementById(`checklist-${index}-item-input`);
    // console.log(input);
    if (input.value != '') {
      checklist.addItem(input.value);
      // console.log(task);
    }
    input.value = '';

  } // addChecklistItem

  updateProgressBar(task: Task, checklist: Checklist) {
    
    var index = task.checklists.indexOf(checklist);
    var completed = checklist.getNumCompleted();
    var total = checklist.items.length;
    var progress = <HTMLElement> document.getElementById(`checklist-${index}-progress`);

    if (total == 0) {
      return;
    }

    if (completed == total) {
      // console.log('100%');
      progress.style.width = '100%';
      setTimeout(() => {
        progress.classList.add('bg-success');
      }, 500);

    } else {

      progress.classList.remove('bg-success');
      var perc = ( ((completed / total)*100).toFixed(3) + "%" );
      progress.style.width = perc;
    }

  } // updateProgressBar

  updateChecklists(task: Task) {

    for (let i = 0; i < task.checklists.length; i++) {
      
      var checklistId = (`edit-task-checklist-${i}-title`);
      var checklist = <HTMLElement> document.getElementById(checklistId);
      
      (task.checklists[i].name) = <string> checklist.textContent;

      for (let j = 0; j < task.checklists[i].items.length; j++) {
        
        var itemId = (`checklist-${i}-item-${j}-name`);
        var item = <HTMLElement> document.getElementById(itemId);
        
        (task.checklists[i].items[j].name = <string> item.textContent);

      }

    }

  } // updateChecklists

  addTaskDate(task: Task) {

    var dateInput = <HTMLInputElement> document.getElementById('task-date');
    var timeInput = <HTMLInputElement> document.getElementById('task-time');
    
    if (dateInput.value != '' && timeInput.value != '') {

      let date = (dateInput.value.split('-')); // yy mm dd
      let time = (timeInput.value.split(':')); // hh mm

      let dateObj = (new Date(
        parseInt(date[0]), parseInt(date[1])-1, parseInt(date[2]),
        parseInt(time[0]), parseInt(time[1])
      ));

      task.setDate(dateObj);

    } else if (dateInput.value != '') {

      let date = (dateInput.value.split('-')); // yy mm dd
      let time = new Date().getTime();

      let dateObj = (new Date(
        parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]),
      ));
      (dateObj.setTime(time));

      task.setDate(dateObj);

    } else if (timeInput.value != '') {

      let time = (timeInput.value.split(':')); // hh mm
      let date = new Date();

      let dateObj = (new Date(
        date.getFullYear(), date.getMonth(), date.getDate(),
        parseInt(time[0]), parseInt(time[1])
      ));
      
      task.setDate(dateObj);

    }

    this.setDateInput(task);

  } // addTaskDate

  removeTaskDate(task: Task) {
    task.removeDate();
    var dateInput = <HTMLInputElement>document.getElementById('task-date');
    var timeInput = <HTMLInputElement>document.getElementById('task-time');
    dateInput.value = '';
    timeInput.value = '';
  } // removeTaskDate

  setDateInput(task: Task) {

    if (task.hasDate()) {
    
      var dateInput = <HTMLInputElement>document.getElementById('task-date');
      var timeInput = <HTMLInputElement>document.getElementById('task-time');
      
      var date = (task.getDate());

      var dateStr = (`${date?.year}-${(date?.month)?.toString().padStart(2, '0')}-${(date?.date)?.toString().padStart(2, '0')}`);
      var timeStr = (`${(date?.hour)?.toString().padStart(2, '0')}:${(date?.minute)?.toString().padStart(2, '0')}`);
      
      dateInput.value = dateStr;
      timeInput.value = timeStr;
      
    }

  } // setDateInput

  taskDateIconToggle(task: Task, action: string) {

    let square = <HTMLElement> document.getElementById('task-date-square');
    let check = <HTMLElement>document.getElementById('task-date-check');
    let clock = <HTMLElement>document.getElementById('task-date-clock');

    switch(action) {

      case 'mouseover':
        
        if (task.isComplete) {

          // show
          (check.style.display) = 'inline';
          // hide
          (square.style.display) = 'none';
          (clock.style.display) = 'none';

        } else {

          // show
          (square.style.display) = 'inline';
          // hide
          (check.style.display) = 'none';
          (clock.style.display) = 'none';

        }
        
        break;

      case 'mouseout':

        // show
        (clock.style.display) = 'inline';
        // hide
        (square.style.display) = 'none';
        (check.style.display) = 'none';
        
        break;

    }

  } // taskDateIconTgggle
  

}
