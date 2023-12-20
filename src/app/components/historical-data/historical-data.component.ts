// Created by: Leyla Kandé on 29 November 2023
// Updated by: JMA on 6.12.23

// Component for showcasing historical sensor data in graph

import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartItem } from 'chart.js/auto';
import { DataService } from '../../services/data-service/data.service';

@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.css']
})
export class HistoricalDataComponent implements OnInit {
  @Input() plantThingyID!: string;

  chart: any;
  selectedTimeRange: string = '1d';
  isLoading: boolean = false; // Variable to track loading state

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchHistoryData();
  }

  fetchHistoryData() {  
    this.isLoading = true; // Set loading state to true
    this.dataService.getHistoricalData(this.plantThingyID, this.selectedTimeRange).subscribe(
      (data) => {
        this.createChart(data);
        console.log("Retrieve history data", data);
        this.isLoading = false; // loading to false once data is retrieved.
      }
    );
  }

  createChart(data: any) {
    const ctx = document.getElementById('historyChart');
    if(!ctx) {
      console.error('Canvas not found')
      return
    }
    // Check if a chart instance already exists
    if (this.chart) {
      // Destroy the existing chart
      this.chart.destroy();
    }
    //Create new chart
    this.chart = new Chart(ctx as ChartItem, {
      type: 'line',
      data: {
        labels: data.labels.map((timestamp: number) => new Date(timestamp * 1000).toLocaleString()),
        datasets: data.datasets.map((dataset: any) => ({
          label: dataset.label,
          data: dataset.data,
          borderColor: dataset.borderColor,
          fill: dataset.fill,
          hidden: ["Air pollution", "Blue", "Green", "Infrared", "Red", "RSRP"].includes(dataset.label) // Hides datasets not shown by default
        }))
      },
      options: {
        scales: {
          x: {
            ticks: {
              maxTicksLimit: 5
            }
          }
        }
      }
    });
  }

  setTimeRange(range: string) {
    this.isLoading = true; // Set loading state to true
    this.selectedTimeRange = range;
    console.log(this.selectedTimeRange);
    this.dataService.getHistoricalData(this.plantThingyID, range).subscribe(
      (data) => {
        this.createChart(data);
        console.log("Retrieve history data", data);
        this.isLoading = false; // loading to false once data is retrieved.
      }
    );
  }
}

