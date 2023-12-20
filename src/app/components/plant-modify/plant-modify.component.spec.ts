import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantModifyComponent } from './plant-modify.component';

describe('PlantModifyComponent', () => {
  let component: PlantModifyComponent;
  let fixture: ComponentFixture<PlantModifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlantModifyComponent]
    });
    fixture = TestBed.createComponent(PlantModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
