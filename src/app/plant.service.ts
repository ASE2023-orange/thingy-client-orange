// Created by: Jean-Marie Alder on 12 November 2023
// Updated by:

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantService {


  constructor(private http: HttpClient) {}

  createPlant(formData: any): Observable<any> {
    const url = `api/plants/create`;
    return this.http.post(url, formData);
  }

  getUsers(): Observable<any> {
    const url = 'api/users';
    return this.http.get(url)
  }

  getPlantById(plantId: string): Observable<any> {
    const url = 'api/plants/' + plantId;
    return this.http.get(url);
  }

  updatePlant(formData: any, plantId: string): Observable<any> {
    const url = 'api/plants/' + plantId;
    return this.http.patch(url, formData)
  }

  getThingyIds(): Observable<any> {
    const url = 'api/thingy_id';
    return this.http.get(url);
  }

  deletePlantById(plantId: string): Observable<any> {
    const url = "api/plants/" + plantId;
    return this.http.delete(url);
  }
}
