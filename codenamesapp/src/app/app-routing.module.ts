import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateGameComponent } from './create-game/create-game.component';
import { MainPageComponent } from './main-page/main-page.component';
import { StagecardsComponent } from './stagecards/stagecards.component';
import { WordcardsComponent } from './wordcards/wordcards.component';

const routes: Routes = [
  {path:'',redirectTo:'mainpage',pathMatch:'full'},
  {path:'mainpage', component:MainPageComponent},
  {path:'wordcards',component:WordcardsComponent},
  {path:'stagecards',component:StagecardsComponent},
  {path:'creategame',component:CreateGameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }