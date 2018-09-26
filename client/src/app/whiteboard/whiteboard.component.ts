import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message } from './shared/model/message';
import { User } from './shared/model/user';
import { SocketService } from './shared/services/socket.service';

@Component({
  selector: 'whiteboard-selector',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css']
})
export class WhiteboardComponent implements OnInit {
  user: User;
  ioConnection: any;
  size  : string;
  container: any;
  flag:boolean=false;
  prevX :number;
  currX:number;
  prevY:number;
  currY:number;
  dot_flag:boolean=false;
  x:string ="red";
  y:number =2; 
  canvas:any; 

  @ViewChild('whiteboard') whiteboard: ElementRef;
  
  constructor(private socketService: SocketService,
    ) { }

  ngOnInit(): void {
    console.log( this.whiteboard);
  }

  ngAfterViewInit(){
    this.container =  this.whiteboard.nativeElement.getContext("2d");
    this.canvas =    this.whiteboard.nativeElement; 
  } 

  public findCordinates(res, e) {
    if (res == 'down') {
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = e.clientX - this.container.offsetLeft;
        this.currY = e.clientY - this.container.offsetTop;

        this.flag = true;
        this.dot_flag = true;
        if (this.dot_flag) {
          this.container.beginPath();
          this.container.fillStyle = this.x;
          this.container.fillRect(this.currX, this.currY, 2, 2);
          this.container.closePath();
          this.dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        this.flag = false;
    }
    if (res == 'move') {
        if (this.flag) {
            this.prevX = this.currX;
            this.prevY = this.currY;
            this.currX = e.clientX - this.canvas.offsetLeft;
            this.currY = e.clientY - this.canvas.offsetTop;
            this.draw();
        }
    }
}

public draw() {
    this.container.beginPath();
    this.container.moveTo(this.prevX, this.prevY);
    this.container.lineTo(this.currX, this.currY);
    this.container.strokeStyle = this.x;
    this.container.lineWidth = this.y;
    this.container.stroke();
    this.container.closePath();
}


public drawLine(){

  this.canvas.addEventListener("mousemove", (e) => {
        this.findCordinates('move', e)
    }, false);
    this.canvas.addEventListener("mousedown", (e) => {
        this.findCordinates('down', e)
    }, false);
    this.canvas.addEventListener("mouseup",  (e) => {
        this.findCordinates('up', e)
    }, false);
    this.canvas.addEventListener("mouseout",  (e) => {
        this.findCordinates('out', e)
    }, false);
}

 
  public shape(event){
    let target =  event.srcElement 
    switch (target.id) {
      case "circle":
          this.drawLine();
          this.broadcastData();
          break;
      case "line":
           this.drawLine();
           this.broadcastData();
          break;
      case "rectangle":
          this.drawLine();
          this.broadcastData();
          break;
      case "square":
          this.drawLine();
          this.broadcastData();
          break;    
        }
  }
  

  // private ConnectToServer(): void {
  //   this.socketService.initSocket();

  //   this.ioConnection = this.socketService.onMessage()
  //     .subscribe((message: Message) => {
  //       this.messages.push(message);
  //     });


  //   this.socketService.onEvent(this)
  //     .subscribe(() => {
  //       console.log('connected');
  //     });

  //   this.socketService.onEvent(Event.DISCONNECT)
  //     .subscribe(() => {
  //       console.log('disconnected');
  //     });
  // }


  public broadcastData(): void {
   
    this.socketService.send({
      content: this.container.getImageData(this.x,this.y,this.container.width,this.container.height)
    });
  }

}