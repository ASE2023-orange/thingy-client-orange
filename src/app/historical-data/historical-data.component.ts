// Created by: Leyla Kandé on 29 November 2023
// Updated by: LK on 29.11.2023

import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DataService } from '../services/data-service/data.service';

@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.css']
})
export class HistoricalDataComponent implements OnInit {
  @Input() plantThingyID!: string;

  chart!: Chart;

  subscription: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchHistoryData();
  }

  fetchHistoryData() {  
    this.dataService.getHistoricalData(this.plantThingyID).subscribe(
      (data) => {
        this.createChart(data);
        console.log("Retrieve history data", data);
      }
    );
  }

  createChart(historicalData: any) {
    this.chart = new Chart("historyChart", {
      type: "line",
      data: {
        labels: historicalData.labels,
        datasets: historicalData.datasets.map((dataSet: any, index: any) => {
          return {
            ...dataSet,
            yAxisID: `y-axis-${index}`, // Assign unique y-axis ID for each dataset
          }
        }),
      },
      options: {
        scales: {       
          y: historicalData.datasets.map((dataSet: any, index: any) => {
            return {
              id: `y-axis-${index}`,
              type: 'linear',
              position:'left',
            }
          })
        }
      }
    });
  }
}

