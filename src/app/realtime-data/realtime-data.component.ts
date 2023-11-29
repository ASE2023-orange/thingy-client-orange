// Created by: Leyla Kandé on 9 November 2023
// Updated by: LK on 29.11.2023

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, timer } from 'rxjs';
import { DataService } from '../services/data-service/data.service';

@Component({
  selector: 'app-realtime-data',
  templateUrl: './realtime-data.component.html',
  styleUrls: ['./realtime-data.component.css']
})
export class RealtimeDataComponent implements OnInit, OnDestroy{
  @Input() plantThingyID!: string;

  Object = Object;
  thingyData: any = {};

  subscription: Subscription = new Subscription;

  constructor(private dataService: DataService) {}

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
    this.dataService.getRealtimeData(this.plantThingyID).subscribe(
      (data) => {
        this.thingyData = data;
      }
    )
  }
}
