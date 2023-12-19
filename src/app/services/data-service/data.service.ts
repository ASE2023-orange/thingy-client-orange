// Created by: Leyla Kandé on 29 November 2023
// Updated by: JMA on 19.12.2023

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getRealtimeData(thingyID: string) : Observable<any> {
    const url = '/api/thingy/' + thingyID;
      return this.http.get(url, {responseType: 'json'})
  }

  getHistoricalData(thingyID: string, timeRange: string) : Observable<any> {
    const url = '/api/influx/' + thingyID + "/" + timeRange;
      return this.http.get(url, {responseType: 'json'})
  }

  getWeatherData(thingyID: string) : Observable<any> {
    const url = '/api/weather/plants/' + thingyID;
      return this.http.get(url, {responseType: 'json'})
  }
}
