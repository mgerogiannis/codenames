import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CardCategory } from '../models/cardcategory';
import { ConnectionKey } from '../models/connectionkey';
import { User } from '../models/user';
import { CardCategoryService } from '../services/cardcategory.service';
import { WebsocketHelperService } from '../services/websocket-helper.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  public connectionKey: ConnectionKey = new ConnectionKey();

  public cardCategories: CardCategory[];
  version = 1;

  _selectedImageId = -1;

  @Input('selectedImageId') set selectedImageId(value: number) {
    this._selectedImageId = value;
  }
  @Output() selectedCategory: CardCategory = null;
  @Output() onCategorySelected = new Subject<CardCategory>();

  get selectedImageId(): number {
    return this._selectedImageId;
  }

  constructor(private cardCategoryService: CardCategoryService, private webSocketHelperService: WebsocketHelperService, private webSocketService: WebsocketService) {}

  ngOnInit(): void {
    this.webSocketService.connect();
    this.getCardCategories();
  }
  
  libraryImageClick(imageId: CardCategory) {
    this.selectedCategory = imageId;
  }

  categorySelected() {
    if (this.selectedCategory != null) {
      this.onCategorySelected.next(this.selectedCategory);
    }
    var random = Math.random();
    var content = String(random);
    this.connectionKey.content = content;
    this.webSocketHelperService.emitConnectionKey(this.connectionKey);
  }

  public getCardCategories(){
    this.cardCategoryService.getCardCategories().subscribe(
      (response: CardCategory[]) => {
        this.cardCategories = response;
  });
 }
}
