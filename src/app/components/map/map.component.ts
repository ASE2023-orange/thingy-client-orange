// Created by: JMA on 8.12.23
// Updated by: JMA on 10.12.23

// component to allow plant selection from map display

import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { PlantService } from '../../services/plant-service/plant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: any;
  currentLayer: any;
  markers = <any>[]


  constructor(private plantService: PlantService, private router: Router) { }

  ngOnInit() {
    //Get preferred layer, if any
    const storedLayer = localStorage.getItem('selectedLayer');
    const defaultLayer = storedLayer || 'national'; // Default to National Map if not found in localStorage
    //Fetch all plants, then init map.
    this.plantService.getAllPlantsMap().subscribe((plants) => {
      this.initializeMap(plants);
    })
  }

  private initializeMap(plants: any) {
    //General setup for map
    this.map = L.map('map').setView([46.8065, 7.1615], 9);
    this.currentLayer = L.tileLayer('https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg', {
      attribution: '© Swisstopo'
    }).addTo(this.map);

    // Add layers to control (layer selection icon)
    const baseLayers = {
      'National Map': this.currentLayer,
      'Satellite': L.tileLayer('https://wmts100.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg', {
        attribution: '© Swisstopo'
      })
    };

    L.control.layers(baseLayers).addTo(this.map);

    //Marker icon setup
    var icon = {
      icon: L.icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        popupAnchor: [ 0, -40 ],
        iconUrl: 'assets/images/marker-icon.png',
        shadowUrl: 'assets/images/marker-shadow.png'
     })
    };

    //generate markers and popups for all stations
    var i = 0
    for(var plant of plants){
      console.log(plant)

      // Determine color based on light_quality
      const getColor = () => {
        switch (plant.light_quality) {
          case 4:
            return 'FF0000';
          case 3:
            return 'FFA500';
          case 2:
            return 'FFFF00';
          case 1:
            return '7FFF00';
          case 0:
            return '00FF00';
          default:
            return 'FFFF00'; // Default color
        }
      };

      // custom HTML content for the popup
      const popupContent = `
        <div>
          <strong>${plant["friendly_name"]}</strong>
          <br>
          Maximum power: ${plant["max_power"]}
          <br>
          Number of panels: ${plant["nr_panels"]}
          <br>
          Light Quality: <span style="color: #${getColor()};">&#11044;</span> ${plant["light_quality"]}
        </div>
      `;

      // Create a closure to capture the value of i (chatgpt)
      const createMarkerEventHandlers = (index: number, plantId: string) => {
        return {
          mouseover: () => {
            this.markers[index].openPopup();
          },
          mouseout: () => {
            this.markers[index].closePopup();
          },
          click: () => {
            // Get the plant ID and navigate to the plant detail page
            this.router.navigate(['/plant/detail', plantId]);
          },
        };
      };


      this.markers[i] = L.marker([plant.lat, plant.lng], icon).addTo(this.map)
       .bindPopup(popupContent)

      // This object serves all events on markers.
      // Customized to have plant id and marker references as params
      const eventHandlers = createMarkerEventHandlers(i, plant.id);

      // Open the popup on marker hover
      this.markers[i].on('mouseover', eventHandlers.mouseover);

      // Close the popup on marker mouseout
      this.markers[i].on('mouseout', eventHandlers.mouseout);

      // On click, redirects to details page of plant
      this.markers[i].on('click', eventHandlers.click);

      console.log(this.markers[i])
      i = i + 1;
    }
  }

  updateMapUrl(mapUrl: string) {
    // Remove the current layer
    this.map.removeLayer(this.currentLayer);

    // Add the new layer
    this.currentLayer = L.tileLayer(mapUrl, {
      attribution: '© Swisstopo'
    }).addTo(this.map);
  }
}