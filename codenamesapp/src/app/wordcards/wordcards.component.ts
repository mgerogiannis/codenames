import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KeyWord } from '../models/keyword';
import { WordCard } from '../models/wordcard';
import { WebsocketService } from '../services/websocket.service';
import { io } from "socket.io-client";
import { WebsocketHelperService } from '../services/websocket-helper.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-wordcards',
  templateUrl: './wordcards.component.html',
  styleUrls: ['./wordcards.component.css']
})
export class WordcardsComponent implements OnInit {

  public wordCards: WordCard[] = [];

  public wordsArray: String[] = [];

  public keyWord: KeyWord;

  keyWordForm: FormGroup;

  choicesForm: FormGroup;

  _selectedImageId = -1;

  @Input('selectedImageId') set selectedImageId(value: number) {
    this._selectedImageId = value;
  }
  @Output() selectedCategory: WordCard = null;
  @Output() onCategorySelected = new Subject<WordCard>();

  get selectedImageId(): number {
    return this._selectedImageId;
  }

  constructor(private webSocketService: WebsocketService, private webSocketHelperService: WebsocketHelperService) { 
    this.keyWordForm = new FormGroup({
      keyWord: new FormControl('Waiting for key word...')
    });

    this.choicesForm = new FormGroup({
      choice: new FormControl('Pick up your choices...')
    });
  }

  ngOnInit(): void {
    this.getWordCards();
    this.getKeyWord();
  }

  public getWordCards(){
    this.webSocketHelperService.listenWordCard('word card').subscribe((data) => {
      this.wordCards = data;    
      });
  }

  getKeyWord(){
    this.webSocketHelperService.listenKeyWord('key word').subscribe(
      x => 
      {
        this.keyWordForm.controls['keyWord'].setValue(x);
      });
  }

  libraryImageClick(imageId: WordCard) {
    this.selectedCategory = imageId;
    this.wordsArray.push(this.selectedCategory.text);
    this.choicesForm.controls['choice'].setValue(this.wordsArray);
  }

  categorySelected() {
    if (this.selectedCategory != null) {
      this.onCategorySelected.next(this.selectedCategory);
    }
  }

  reset(){
    this.wordsArray = [];
    this.choicesForm.controls['choice'].setValue('');
  } 

  send() {
    this.webSocketHelperService.emitChoices(this.wordsArray);
  }

  pass(){
    this.wordsArray = [];
    this.webSocketHelperService.emitChoices(this.wordsArray);
  }

}
