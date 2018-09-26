import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';

const routes: Routes = [
  {
    path: '', component: WhiteboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }