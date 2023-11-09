// Created by: Leyla Kandé on 9 November 2023
// Updated by: LK on 9.11.2023

import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, timer } from 'rxjs';

@Component({
  selector: 'app-realtime-data',
  templateUrl: './realtime-data.component.html',
  styleUrls: ['./realtime-data.component.css']
})
export class RealtimeDataComponent implements OnInit, OnDestroy{
  @Input() plantThingyID!: string;

  Object = Object;
  thingyData: any;

  subscription: Subscription = new Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
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
      console.log("retrieve thingy data")
    });
  }

}
