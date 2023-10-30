import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-realtime-data',
  templateUrl: './realtime-data.component.html',
  styleUrls: ['./realtime-data.component.css']
})
export class RealtimeDataComponent implements OnInit, OnDestroy {
  sensorData = new Map<string, string>()

  thingyData: any;
  airPressure: any;


  private eventSource = new EventSource('http://localhost:8080/live_data', { withCredentials: true });
  success = "success";

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log("start");
    this.fetchThingyData();

    this.eventSource.onmessage = (event) => {
      console.log("sse update");
      this.success = event.data;
    };

    this.eventSource.onerror = (error) => {
      console.error('SSE error: ', error);
    };
  }

  ngOnDestroy(): void {
    this.eventSource.close();
  }

  fetchThingyData() {
    return this.http.get('/api/thingy', {responseType:'json'})
    .subscribe((data: any) => {
      this.thingyData = data;
      // console.log('thingy data: receives', this.thingyData);

      // const jsonData = JSON.parse(data);
      // if (jsonData.appId === 'AIR_PRESS') {
      //   // this.sensorData.set('airPressure', jsonData.data);
      //   this.airPressure = jsonData.data;
      // } else if (jsonData.appId === 'HUMID'){
      //   this.sensorData.set('humidity', jsonData.data);
      // } else if (jsonData.appId === 'LIGHT') {
      //   this.sensorData.set('light', jsonData.data);
      // }
    });
  }

  getSSEData() {
    this
  }

}
