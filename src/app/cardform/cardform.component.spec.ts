import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardformComponent } from './cardform.component';

describe('CardformComponent', () => {
  let component: CardformComponent;
  let fixture: ComponentFixture<CardformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
