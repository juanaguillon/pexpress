/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerticalItemsComponent } from './verticalItems.component';

describe('VerticalItemsComponent', () => {
  let component: VerticalItemsComponent;
  let fixture: ComponentFixture<VerticalItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
