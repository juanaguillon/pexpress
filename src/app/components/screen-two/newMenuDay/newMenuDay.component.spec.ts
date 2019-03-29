/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewMenuDayComponent } from './newMenuDay.component';

describe('NewMenuDayComponent', () => {
  let component: NewMenuDayComponent;
  let fixture: ComponentFixture<NewMenuDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMenuDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMenuDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
