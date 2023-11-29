import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { interval } from 'rxjs';

@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.css']
})
export class HistoricalDataComponent implements OnInit {
  @Input() plantThingyID!: string;

  historyData: any = {};
  subscription: any;

  public chart: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchHistoryData();
    // TODO: remove this and solve same bug as in realtime data (input is undefined upon init)
    this.subscription = interval(3000).subscribe(() => {
      this.fetchHistoryData();
      this.createChart()
    })
    
  }

  fetchHistoryData() {
    const url = '/api/influx/' + this.plantThingyID;
    return this.http.get(url, {responseType: 'json'})
    .subscribe((data: any) => {
      this.historyData = data;
      console.log("retrieve history data")
    });
  }

  createChart() {
    //const ctx = document.getElementById('historyChart') as HTMLCanvasElement;
    this.chart = new Chart('historyChart', {
      type: 'line',
      data: {
        labels: [], //this.formatTimestamps(),
        datasets:  [
          { label: "", data: [''],},
          { label: "", data: [''],}]
          //this.historyData.dataset, //this.getDataSets()
        },
      // options: {
      //   scales: {
      //     x: {
      //         type: 'time',
      //         time: {
      //           unit: 'minute',
      //         },
      //         title: {
      //         display: true,
      //         text: ["Time [10 min]"]
      //       },
      //       },
      //     y: {
      //       title: {
      //         display: true,
      //         text: ["Measures"]
      //       },
      //     } 
      //   },
      // },
  });
  }

  formatTimestamps(): string[] {
    // Format timestamps into readable dates
    return this.historyData.timestamps.map((timestamp: number) => {
      const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
      return date.toLocaleTimeString();
    });
  }

  getDataSets() {
    return this.historyData.datasets.map((dataset: { label: any; data: any; borderColor: any; fill: any; }) => {
      return {
        label: dataset.label,
        data: dataset.data,
        borderColor: dataset.borderColor,
        fill: dataset.fill
      };
    });
  }
}

