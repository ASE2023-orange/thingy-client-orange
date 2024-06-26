// Created by: Jean-Marie Alder on 9 November 2023
// Updated by: 

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'thingy-client-orange';
  message: string;

  constructor(private http: HttpClient) {
    this.message = ''; // Initialize the message variable
  }

  ngOnInit() {
    this.fetchMessageFromAPI();
  }

  fetchMessageFromAPI() {
    return this.http.get('/api/test', {responseType:'json'})
      .subscribe((data: any) => {
        console.log(data['message'])
        this.message = data['message']
      });
  }
}
