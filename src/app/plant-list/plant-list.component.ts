// Created by: Leyla Kandé on 9 November 2023
// Updated by: LK on 27.11.2023

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit{

  plantList: any = {};

  constructor(private http: HttpClient, private router: Router) {}
  
  ngOnInit(): void {
    this.fetchPlantList();
    if(JSON.stringify(this.plantList) === JSON.stringify([])) {
      this.createPlants();
      this.fetchPlantList();
    }
  }

  //TODO: remove once DB persists
  createPlants() {
    const url = '/api/plants/create/dev';
    return this.http.get(url, {responseType: 'json'})
    .subscribe((data: any) => {
      this.plantList = data;
      console.log("retrieve plant list")
    });
  }

  fetchPlantList() {
    const url = '/api/plants';
    return this.http.get(url, {responseType: 'json'})
    .subscribe((data: any) => {
      this.plantList = data;
      console.log("retrieve plant list")
    });
  }

  navigateToDetail(id: string) {
    this.router.navigate(['plant/detail', id]);
  }
}
