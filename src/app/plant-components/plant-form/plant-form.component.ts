// Created by: Jean-Marie Alder on 12 November 2023
// Updated by:

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PlantService } from '../../plant.service';

@Component({
  selector: 'app-plant-form',
  templateUrl: './plant-form.component.html',
  styleUrls: ['./plant-form.component.css']
})
export class PlantFormComponent implements OnInit{
  @Input() editMode!: boolean;
  @Input() plantId!: string;
  plantData: any = {};
  plantForm!: FormGroup;
  users: any[] = [];
  thingyIds: string[] = [];

  constructor(
    private fb: FormBuilder, 
    private plantService: PlantService, 
    private router: Router, 
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.initForm();
    this.initUsers();
    this.initThingyIds();

    if(this.editMode){
      console.log("Edit mode.")
      this.loadPlantData();
    }else{
      console.log("Add mode.")
    }
  }

  initForm(): void {
    this.plantForm = this.fb.group({
      friendly_name: ['', Validators.required],
      locality: ['', Validators.required],
      npa: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      max_power: ['', Validators.required],
      nr_panels: ['', Validators.required],
      contact_person: ['', Validators.required],
      thingy_id: ['', Validators.required]
    });
  }

  loadPlantData(): void {
    this.plantService.getPlantById(this.plantId).subscribe(
      (plantData) => {
        // Update the form values with the fetched plant data
        this.plantData = plantData;
        this.plantForm.patchValue(plantData);
      }
    );
  }

  initUsers(): void {
    // Fetch users from the API and populate the 'users' array
    this.plantService.getUsers().subscribe(
      (users) => {
        this.users = users;
      }
    );
  }
  initThingyIds(): void {
    // Fetch thingy ids from database
    this.plantService.getThingyIds().subscribe(
      (thingyIds) => {
        this.thingyIds = thingyIds;
      }
    );
  }

  deletePlant(){
    this.plantService.deletePlantById(this.plantId).subscribe(
      (message) => {
        console.log(message);
        this.toastr.success(
          'Plant deleted successfully!', 
          this.plantData.friendly_name, 
          {closeButton: true, timeOut: 10000}
          );
        this.router.navigate(['/']);
      }
    );
  }

  onSubmit(): void {
    if (this.plantForm && this.plantForm.valid) {
      const formData = this.plantForm.value;
      if (formData.contact_person.id){
        formData.contact_person = formData.contact_person.id;
      }
      if (this.editMode){
        // Call your plant service to submit the form data to the server
        this.plantService.updatePlant(formData, this.plantId).subscribe(
          (response: any) => {
            console.log('Plant updated successfully:', response);
            this.toastr.success(
              'Plant updated successfully!', 
              formData.friendly_name, 
              {closeButton: true, timeOut: 10000}
              );
            this.router.navigate(['/']); //back to list
          }
        );
      }else{
        // Call your plant service to submit the form data to the server
        this.plantService.createPlant(formData).subscribe(
          (response: any) => {
            console.log('Plant created successfully:', response);
            this.toastr.success(
              'Plant added successfully!', 
              formData.friendly_name, 
              {closeButton: true, timeOut: 10000}
              );
            this.router.navigate(['/']); //back to list
          }
        );
      }
      
    }
  }
}
