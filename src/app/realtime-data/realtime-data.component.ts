// Created by: Leyla Kandé on 9 November 2023
// Updated by: 

import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, timer } from 'rxjs';

@Component({
  selector: 'app-realtime-data',
  templateUrl: './realtime-data.component.html',
  styleUrls: ['./realtime-data.component.css']
})
export class RealtimeDataComponent implements OnInit, OnDestroy{
  Object = Object;
  thingyData: any;

  subscription: Subscription = new Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log("start");
    this.fetchThingyData();
    this.subscription = interval(3000).subscribe(() => {
      this.fetchThingyData();
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchThingyData() {
    return this.http.get('/api/thingy', {responseType:'json'})
    .subscribe((data: any) => {
      this.thingyData = JSON.parse(data);
      // this.pressure = data.pressure;
      // this.humidity = data.humidity;
      // this.light = data.light;
      console.log("retrieve thingy data")
    });
  }

}
