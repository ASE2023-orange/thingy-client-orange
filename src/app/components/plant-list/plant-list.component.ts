// Created by: Leyla Kandé on 9 November 2023
// Updated by: JMA on 20.12.2023

// Component for listing all plants 

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit{

  plantList: any = [];

  constructor(private http: HttpClient, private router: Router) {}
  
  ngOnInit(): void {
    this.fetchPlantList();
    if(JSON.stringify(this.plantList) === JSON.stringify([])) {
      this.fetchPlantList();
    }
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
