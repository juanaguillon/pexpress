/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewComboComponent } from './newCombo.component';

describe('NewComboComponent', () => {
  let component: NewComboComponent;
  let fixture: ComponentFixture<NewComboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewComboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
