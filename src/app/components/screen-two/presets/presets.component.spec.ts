/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PresetsComponent } from './presets.component';

describe('PresetsComponent', () => {
  let component: PresetsComponent;
  let fixture: ComponentFixture<PresetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
