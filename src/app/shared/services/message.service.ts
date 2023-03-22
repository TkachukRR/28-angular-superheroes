import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

export interface MessageWindow{
  messageText: string;
  type: 'success' | 'warning';
}

@Injectable()
export class MessageService {
  public messageWindow$ = new Subject<MessageWindow>();

  public success(messageText: string){
    this.messageWindow$.next({type: 'success', messageText});
  }

  public warning(messageText: string){
    this.messageWindow$.next({type: 'warning', messageText});
  }
}
