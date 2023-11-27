// Created by: Leyla Kandé on 9 November 2023
// Updated by: LK on 27.11.2023

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.css']
})
export class PlantDetailComponent implements OnInit{

  plantID!: string | null;
  plantData: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.plantID = params.get('id')
      this.fetchPlant();
    }) 
  }

  fetchPlant() {
    const url = '/api/plants/' + this.plantID;
    return this.http.get(url, {responseType:'json'})
    .subscribe((data: any) => {
      this.plantData = data;
      console.log("retrieve plant data")
    });
  }
}

