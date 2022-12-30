import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { Board } from '../models/board.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: [
    '../main/main.component.scss', 
    './board.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class BoardComponent extends MainComponent implements OnInit {

  @Input() board?: Board;

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

  
}
