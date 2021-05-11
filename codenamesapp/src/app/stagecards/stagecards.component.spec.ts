import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagecardsComponent } from './stagecards.component';

describe('StagecardsComponent', () => {
  let component: StagecardsComponent;
  let fixture: ComponentFixture<StagecardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagecardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagecardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
