// Created by: Leyla Kandé on 9 November 2023
// Updated by: LK on 9.11.2023

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.css']
})
export class PlantDetailComponent implements OnInit{

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const plantID = this.route.paramMap.subscribe((params) => {
      params.get('id')
    })
  }
}

