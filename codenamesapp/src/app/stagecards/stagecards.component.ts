import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KeyWord } from '../models/keyword';
import { StageCard } from '../models/stagecard';
import { WordCard } from '../models/wordcard';
import { WebsocketHelperService } from '../services/websocket-helper.service';
import { WebsocketService } from '../services/websocket.service';
import { WordCardService } from '../services/wordcard.service';

@Component({
  selector: 'app-stagecards',
  templateUrl: './stagecards.component.html',
  styleUrls: ['./stagecards.component.css']
})
export class StagecardsComponent implements OnInit, AfterViewInit {

  public wordCards: WordCard[] = [];
  public answersArray: String[] = [];
  keyWordForm: FormGroup;
  public stageCards: StageCard[] = [];
  public randomStage: StageCard;
  public stageC1: StageCard = {
    id : 1,
    stage : [ ["blue", "red", "blue","white","red"], ["red", "white", "red","red","blue"], ["white", "blue", "black","blue","white"], ["blue", "red", "white","white","red"], ["blue", "red", "blue","white","blue"] ],
    symbol: "x"
  };
  public stageC2: StageCard = {
    id : 2,
    stage : [ ["red", "blue", "blue","red","white"], ["black", "white", "blue","red","blue"], ["red", "blue", "red","white","blue"], ["red", "blue", "white","red","white"], ["blue", "white", "blue","white","red"] ],
    symbol: "x"
  };
  public stageC3: StageCard = {
     id : 3,
     stage : [ ["red", "red", "white","red","blue"], ["blue", "white", "blue","red","white"], ["red", "white", "blue","black","blue"], ["white", "blue", "red","white","blue"], ["red", "blue", "red","white","red"] ],
     symbol: "x"
  };

  public stageC4: StageCard = {
     id : 4,
     stage : [ ["red", "blue", "red","blue","white"], ["blue", "black", "red","blue","white"], ["red", "white", "blue","red","white"], ["red", "blue", "white","red","white"], ["blue", "blue", "red","white","blue"] ],
     symbol: "x"
  };

  public stageC5: StageCard = {
    id : 5,
    stage : [ ["white", "blue", "red","white","blue"], ["red", "white", "red","blue","red"], ["blue", "black", "red","white","blue"], ["red", "blue", "blue","white","red"], ["white", "blue", "red","white","red"] ],
    symbol: "x"
  };

  public stageC6: StageCard = {
    id : 6,
    stage : [ ["red", "blue", "red","white","blue"], ["blue", "white", "blue","blue","red"], ["white", "red", "black","red","white"], ["red", "blue", "white","white","blue"], ["red", "blue", "red","white","red"] ],
    symbol: "x"
  };
  
  public stageC7: StageCard = {
    id : 7,
    stage : [ ["blue", "red", "white","red","white"], ["red", "white", "blue","black","red"], ["white", "blue", "white","blue","blue"], ["blue", "red", "red","blue","blue"], ["white", "blue", "red","white","red"] ],
    symbol: "x"
  };

  public stageC8: StageCard = {
    id : 8,
    stage : [ ["blue", "red", "blue","white","red"], ["red", "white", "red","red","blue"], ["white", "blue", "black","blue","white"], ["blue", "red", "white","white","red"], ["blue", "red", "blue","white","red"] ],
    symbol: "x"
  };

  public stageC9: StageCard = {
   id : 9,
   stage : [ ["red", "blue", "blue","white","red"], ["red", "white", "blue","red","blue"], ["white", "blue", "white","blue","white"], ["blue", "red", "white","blue","red"], ["blue", "red", "white","red","black"] ],
   symbol: "x"
  };

  public stageC10: StageCard = { 
   id : 10,
   stage : [ ["red", "red", "blue","white","blue"], ["black", "white", "blue","red","blue"], ["white", "red", "white","red","white"], ["blue", "red", "white","blue","red"], ["red", "red", "blue","white","blue"] ],
   symbol: "x"
  };

  

  constructor(private webSocketService: WebsocketService, private wordCardService: WordCardService, private webSocketHelperService: WebsocketHelperService) {
    
    this.stageCards.push(this.stageC1);
    this.stageCards.push(this.stageC2);
    this.stageCards.push(this.stageC3);
    this.stageCards.push(this.stageC4);
    this.stageCards.push(this.stageC5);
    this.stageCards.push(this.stageC6);
    this.stageCards.push(this.stageC7);
    this.stageCards.push(this.stageC8);
    this.stageCards.push(this.stageC9);
    this.stageCards.push(this.stageC10);

    this.randomChoice();
    this.getWordCards();
    this.recieveAnswers();

    this.keyWordForm = new FormGroup({
      keyWord: new FormControl('Enter a key word')
    });

   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  public getWordCards(){
    this.webSocketHelperService.listenWordCard('word card').subscribe((data) => {
      if(data != null)
      {
        this.wordCards = data;    
      }
      else{
        this.wordCardService.getWordCards().subscribe(
          (response: WordCard[]) => {
            this.wordCards = response;
            this.webSocketHelperService.emitWordCard(this.wordCards);
          });
      }
      });
  }

  randomChoice(){
      this.webSocketHelperService.listenStageCard('stage card').subscribe((data) => {
        if(data != null)
        {
          this.randomStage = data;
        }
        else
        {
          var item = this.stageCards[Math.floor(Math.random() * this.stageCards.length)];
          this.randomStage = item;
          this.webSocketHelperService.emitStageCard(this.randomStage);
        }
      });      
      return this.randomStage;
  }

  sendKeyWord() {
    var keyWord = this.keyWordForm.get('keyWord').value;
    var sendKeyWord: KeyWord = new KeyWord();
    sendKeyWord.content = keyWord;
    this.webSocketHelperService.emitKeyWord(sendKeyWord);
  }

  recieveAnswers() {
    this.webSocketHelperService.listenStageCard('choices').subscribe((data) => {
      if(data != null)
      {
        this.answersArray = data;
      }
      else
      {
        this.answersArray = [];
      }
    });
      
  }

}
