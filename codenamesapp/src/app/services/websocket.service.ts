import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { ConnectionKey } from '../models/connectionkey';
import { WordCard } from '../models/wordcard';
import { KeyWord } from '../models/keyword';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  showConversation: boolean = false;
  ws: any;
  name: string;
  disabled: boolean;

  _connectionKeyMessage = new ReplaySubject<string>(1);
  //connectionKeyMessage: ConnectionKey;
  connectionKeyMessage = this._connectionKeyMessage.asObservable();

  _keyWordMessage = new ReplaySubject<KeyWord>(1);
  //keyWordMessage: KeyWord;
  keyWordMessage = this._keyWordMessage.asObservable();


  _wordCardsMessage = new ReplaySubject<WordCard[]>(1);
  //wordCardsMessage: WordCard[];
  wordCardsMessage = this._wordCardsMessage.asObservable();


  

  constructor(){}

  connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS('http://localhost:8080/gs-guide-websocket');
    this.ws = Stomp.over(ws);
    let that = this;
    this.ws.connect({}, function(frame) {
      that.ws.subscribe("/errors", function(message) {
        alert("Error " + message.body);
      });
      that.ws.subscribe("/topic/connectionkey", function(message: ConnectionKey) {
        //that.handleConnectionKey(message);
        console.log("Message Recieved from Server :: " + message);
        that._connectionKeyMessage.next(JSON.stringify(message));
      });
      that.ws.subscribe("/topic/keyword", function(message: KeyWord) {
        that.handleKeyWord(message);
      });
      that.ws.subscribe("/topic/wordcards", function(message: WordCard[]) {
        that.handleWordCards(message);
      });
      that.disabled = true;
    }, function(error) {
      alert("STOMP error " + error);
    });
  }

  disconnect() {
    if (this.ws != null) {
      this.ws.ws.close();
    }
    this.setConnected(false);
    console.log("Disconnected");
  }

  // handleConnectionKey(message: ConnectionKey){
  //   this.showConversation = true;
  //   //this.connectionKeyMessage = message;
  //   message.content.replace(/\D/g,'');
  //   this._connectionKeyMessage.next(message);
  // }

  handleKeyWord(message: KeyWord){
    this.showConversation = true;
    //this.keyWordMessage = message;
    this._keyWordMessage.next(message);
  }

  handleWordCards(message: WordCard[]){
    this.showConversation = true;
    //this.wordCardsMessage = message;
    this._wordCardsMessage.next(message);
  }

  sendConnectionKey(message: ConnectionKey) {
    this.ws.send("/app/connectionkey", {}, JSON.stringify(message));
  }

  sendKeyWord(message: KeyWord) {
    this.ws.send("/app/keyword", {}, JSON.stringify(message));
  }

  sendWordCards(message: WordCard[]) {
    this.ws.send("/app/wordcards", {}, JSON.stringify(message));
  }

  recieveConnectionKey(message: ConnectionKey) {
    this.showConversation = true;
    return message;
  }

  recieveKeyWord(message: KeyWord) {
    this.showConversation = true;
    return message;
  }

  recieveWordCards(message: WordCard[]) {
    this.showConversation = true;
    return message;
  }

  setConnected(connected) {
    this.disabled = connected;
    this.showConversation = connected;
  }

}
