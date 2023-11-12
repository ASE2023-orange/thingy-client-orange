// Created by: Jean-Marie Alder on 12 November 2023
// Updated by: 

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plant-modify',
  templateUrl: './plant-modify.component.html',
  styleUrls: ['./plant-modify.component.css']
})
export class PlantModifyComponent implements OnInit{
  plantId: string = "";

  constructor(private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    //Retrieve plant ID from url
    this.route.paramMap.subscribe((params) => {
      const plantID = params.get('id')
      if(plantID){
        this.plantId = plantID
      }
    })
  }
}
