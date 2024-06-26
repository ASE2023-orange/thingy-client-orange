
// Created by: Leyla Kandé on 9 November 2023
// Updated by: 

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeDataComponent } from './realtime-data.component';

describe('RealtimeDataComponent', () => {
  let component: RealtimeDataComponent;
  let fixture: ComponentFixture<RealtimeDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RealtimeDataComponent]
    });
    fixture = TestBed.createComponent(RealtimeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
