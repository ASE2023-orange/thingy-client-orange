// Created by: Jean-Marie Alder on 9 November 2023
// Updated by: LK 27.11.23

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantDetailComponent } from './components/plant-detail/plant-detail.component';
import { PlantListComponent } from './components/plant-list/plant-list.component';
import { PlantAddComponent } from './components/plant-add/plant-add.component';
import { PlantModifyComponent } from './components/plant-modify/plant-modify.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  { path: '', component: PlantListComponent },
  // using plant ID under assumption that it will be immutable
  { path: 'plant/detail/:id', component: PlantDetailComponent},
  { path: 'plant/add', component: PlantAddComponent},
  { path: 'plant/manage/:id', component: PlantModifyComponent},
  { path: 'map', component: MapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
