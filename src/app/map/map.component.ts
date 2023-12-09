// Created by: JMA on 8.12.23
// Updated by: JMA on 8.12.23

import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { PlantService } from '../plant.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: any;

  constructor(private plantService: PlantService) { }

  ngOnInit() {
    //Fetch all plants, then init map.
    this.plantService.getAllPlants().subscribe((plants) => {
      this.initializeMap(plants);
    })
  }

  private initializeMap(plants: any) {
    this.map = L.map('map').setView([46.8065, 7.1615], 9);

    //L.tileLayer('https://wmts100.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg', {
    L.tileLayer('https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg', {
      attribution: '© OpenStreetMap contributors | Geoadmin, Swisstopo'
    }).addTo(this.map);

    var icon = {
      icon: L.icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 0 ],
        // specify the path here
        iconUrl: 'assets/images/marker-icon.png',
        shadowUrl: 'assets/images/marker-shadow.png'
     })
  };

    L.marker([51.505, -0.09], icon).addTo(this.map)
      .bindPopup('A sample marker on the map.')
  }
}