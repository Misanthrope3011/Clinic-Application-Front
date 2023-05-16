import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VisitDeletedComponent} from './visit-deleted.component';

describe('VisitDeletedComponent', () => {
  let component: VisitDeletedComponent;
  let fixture: ComponentFixture<VisitDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitDeletedComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
