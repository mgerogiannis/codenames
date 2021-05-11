import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { WordCard } from '../models/wordcard';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class WordCardService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getWordCards(): Observable<WordCard[]>{
        return this.http.get<any>(`${this.apiServerUrl}/wordcard/all`);
    }

    public addWordCards(wordCard: WordCard): Observable<WordCard>{
        return this.http.post<WordCard>(`${this.apiServerUrl}/wordcard/add`, wordCard);
    }
}