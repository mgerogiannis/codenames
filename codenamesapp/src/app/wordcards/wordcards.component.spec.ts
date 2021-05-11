import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordcardsComponent } from './wordcards.component';

describe('WordcardsComponent', () => {
  let component: WordcardsComponent;
  let fixture: ComponentFixture<WordcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordcardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
