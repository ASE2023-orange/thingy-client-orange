// Created by: Leyla Kandé on 9 November 2023
// Updated by: LK on 9.11.2023

import { Component } from '@angular/core';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent {

  plants = {
    "Morges": {id: 1, thingy: "orange-1"}, 
    "Fribourg": {id: 2, thingy: "orange-2"}
  };
}
