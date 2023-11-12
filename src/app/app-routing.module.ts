// Created by: Jean-Marie Alder on 9 November 2023
// Updated by: LK 9.11.23

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantDetailComponent } from './plant-detail/plant-detail.component';
import { PlantListComponent } from './plant-list/plant-list.component';
import { PlantAddComponent } from './plant-add/plant-add.component';
import { PlantModifyComponent } from './plant-modify/plant-modify.component';

const routes: Routes = [
  { path: '', component: PlantListComponent },
  // using plant ID under assumption that it will be immutable
  { path: 'detail/:id', component: PlantDetailComponent},
  { path: 'plant/add', component: PlantAddComponent},
  { path: 'plant/manage/:id', component: PlantModifyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
