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
    this.fetchWeatherData()
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
    // Implement your logic to determine the color based on the percentage
    // For simplicity, I'll use a basic example:
    return percentage > 50 ? 'red' : 'green';
  }

}