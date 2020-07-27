import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispRecommendsComponent } from './disp-recommends.component';

describe('DispRecommendsComponent', () => {
  let component: DispRecommendsComponent;
  let fixture: ComponentFixture<DispRecommendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispRecommendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispRecommendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
