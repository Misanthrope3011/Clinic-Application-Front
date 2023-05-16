import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DisplayVisitComponent} from './display-visit.component';

describe('DisplayVisitComponent', () => {
  let component: DisplayVisitComponent;
  let fixture: ComponentFixture<DisplayVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayVisitComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
