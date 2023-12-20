//Created by JMA on 19.12.23

import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../services/data-service/data.service';

@Component({
  selector: 'app-plant-weather-info',
  templateUrl: './plant-weather-info.component.html',
  styleUrls: ['./plant-weather-info.component.css']
})
export class PlantWeatherInfoComponent implements OnInit{

  @Input() plantId!: string;
  isLoaded = false
  weatherData: any = {}

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchWeatherData();
  }

  fetchWeatherData() {
    this.dataService.getWeatherData(this.plantId).subscribe(
      (data) => {
        this.weatherData = data;
        console.log(this.weatherData);
        this.isLoaded = true;
      }
    )
  }

  getCloudCoverColor(percentage: number): string {
    if (percentage < 20) {
        return '#00FF00';
    } else if (percentage < 40) {
        return '#7FFF00';
    } else if (percentage < 60) {
        return '#FFFF00';
    } else if (percentage < 80) {
        return '#FFA500';
    } else {
        return '#FF0000';
    }
  }

}
