import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StageCard } from '../models/stagecard';
import { environment } from 'src/environments/environment';
import { CardCategory } from '../models/cardcategory';


@Injectable({
    providedIn: 'root'
})
export class CardCategoryService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getCardCategories(): Observable<CardCategory[]>{
        return this.http.get<any>(`${this.apiServerUrl}/cardcategory/all`);
    }

    public addCardCategories(cardCategory: CardCategory): Observable<CardCategory>{
        return this.http.post<CardCategory>(`${this.apiServerUrl}/stagecard/add`, cardCategory);
    }
}