import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantWeatherInfoComponent } from './plant-weather-info.component';

describe('PlantWeatherInfoComponent', () => {
  let component: PlantWeatherInfoComponent;
  let fixture: ComponentFixture<PlantWeatherInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlantWeatherInfoComponent]
    });
    fixture = TestBed.createComponent(PlantWeatherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
