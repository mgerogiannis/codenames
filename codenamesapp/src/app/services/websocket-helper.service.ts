import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConnectionKey } from '../models/connectionkey';
import { KeyWord } from '../models/keyword';
import { WordCard } from '../models/wordcard';
import { WebsocketService } from './websocket.service';
import { io } from "socket.io-client";
import { StageCard } from '../models/stagecard';

@Injectable({
  providedIn: 'root'
})
export class WebsocketHelperService {
  private apiServerUrl = environment.apiBaseUrl;
  private socket: any;
  _connectionKeyMessage = new BehaviorSubject<any>('');
  connectionKeyMessage = this._connectionKeyMessage.asObservable();


  constructor(private http: HttpClient) {
    this.socket = io("http://localhost:3000");
  }



  listenConnectionKey(eventname: string) {
    return new Observable<string>((subscriber) => {
      this.socket.on(eventname, (data) => {
        subscriber.next(data);
      })
    });
  }

  emitConnectionKey(data: ConnectionKey){
    this.socket.emit('connection key', data);
  }

  listenKeyWord(eventname: string) {
    return new Observable<string>((subscriber) => {
      this.socket.on(eventname, (data) => {
        subscriber.next(data);
      })
    });
  }

  emitKeyWord(data: KeyWord){
    this.socket.emit('key word', data);
  }

  listenWordCard(eventname: string) {
    return new Observable<any>((subscriber) => {
      this.socket.on(eventname, (data) => {
        subscriber.next(data);
      })
    });
  }

  emitWordCard(data: WordCard[]){
    this.socket.emit('word card', data);
  }

  listenStageCard(eventname: string) {
    return new Observable<any>((subscriber) => {
      this.socket.on(eventname, (data) => {
        subscriber.next(data);
      })
    });
  }

  emitStageCard(data: StageCard){
    this.socket.emit('stage card', data);
  }

  listenChoices(eventname: string) {
    return new Observable<String[]>((subscriber) => {
      this.socket.on(eventname, (data) => {
        subscriber.next(data);
      })
    });
  }

  emitChoices(data: String[]){
    this.socket.emit('choices', data);
  }









  

    // public postConnectionKey(connectionKey: ConnectionKey): Observable<ConnectionKey>{
  //   return this.http.post<ConnectionKey>(`${this.apiServerUrl}/websocket/connectionkey`, connectionKey);
  // }

  // public postKeyWord(keyWord: KeyWord): Observable<KeyWord>{
  //   return this.http.post<KeyWord>(`${this.apiServerUrl}/websocket/keyword`, keyWord);
  // }

  // public postWordCards(wordCards: WordCard[]): Observable<WordCard[]>{
  //   return this.http.post<WordCard[]>(`${this.apiServerUrl}/websocket/wordcard`, wordCards);
  // }

  // public recieveConnectionKey(){
  //   this.socket.on('connection key', (message) => {
  //     this._connectionKeyMessage.next(message);
  //   });
  // }


}


