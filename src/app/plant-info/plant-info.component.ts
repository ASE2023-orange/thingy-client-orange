import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plant-info',
  templateUrl: './plant-info.component.html',
  styleUrls: ['./plant-info.component.css']
})
export class PlantInfoComponent {
  @Input() plantData: any;
}
