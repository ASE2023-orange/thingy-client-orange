// Created by: Leyla Kandé on 9 November 2023
// Updated by: LK on 29.11.2023

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantService } from '../plant.service';

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.css']
})
export class PlantDetailComponent implements OnInit{

  isDataLoaded = false;
  plantID!: string | null;
  plantData: any = {};

  constructor(private route: ActivatedRoute, private plantService: PlantService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.plantID = params.get('id')
      this.fetchPlant(String(this.plantID));
    }) 
  }

  fetchPlant(plantID: string) {
    this.plantService.getPlantById(plantID).subscribe(
      (plantData) => {
        this.plantData = plantData;
        this.isDataLoaded = true;
      }
    );
  }
}

