// Created by: JMA on ?? Nov 2023

// Component holding plant info from plant table in Postgres

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plant-info',
  templateUrl: './plant-info.component.html',
  styleUrls: ['./plant-info.component.css']
})
export class PlantInfoComponent {
  @Input() plantData: any;
}
