import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhiteboardComponent } from './whiteboard.component';
import { SocketService } from '../whiteboard/shared/services/socket.service';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [WhiteboardComponent,UserComponent],
  providers: [SocketService]
})
export class WhiteboardModule { }
