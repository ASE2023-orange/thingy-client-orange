import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantInfoComponent } from './plant-info.component';

describe('PlantInfoComponent', () => {
  let component: PlantInfoComponent;
  let fixture: ComponentFixture<PlantInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlantInfoComponent]
    });
    fixture = TestBed.createComponent(PlantInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
