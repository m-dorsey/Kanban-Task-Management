import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { BoardComponent } from './board/board.component';

const routes: Routes = [
  {
    path: '', 
    component: MainComponent,
    children: [
      { path: 'board', component: BoardComponent }
    ]
  },
  {path: 'main', component: MainComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
