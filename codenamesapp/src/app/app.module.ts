import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WordCardService } from './services/wordcard.service';
import { HttpClientModule } from '@angular/common/http';
import { WordcardsComponent } from './wordcards/wordcards.component';
import { StagecardsComponent } from './stagecards/stagecards.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPageComponent } from './main-page/main-page.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { CardCategoryService } from './services/cardcategory.service';
import { WebsocketService } from './services/websocket.service';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';


@NgModule({
  declarations: [
    AppComponent,
    WordcardsComponent,
    StagecardsComponent,
    MainPageComponent,
    CreateGameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  
  providers: 
  [
   WordCardService,
   CardCategoryService, 
   WebsocketService,
   {
    provide: InjectableRxStompConfig,
  },
  {
    provide: RxStompService,
    useFactory: rxStompServiceFactory,
    deps: [InjectableRxStompConfig],
  }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
