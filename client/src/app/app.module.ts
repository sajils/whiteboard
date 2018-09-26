import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { SocketService } from './whiteboard/shared/services/socket.service';

@NgModule({
  declarations: [
    AppComponent,
    WhiteboardComponent
    
   
  ],
  imports: [
    BrowserModule,AppRoutingModule,RouterModule,BrowserAnimationsModule,FormsModule,HttpClientModule,HttpModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})

export class AppModule { }
