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
    // this.http.get<any>('http://localhost:8080/test')
    //   .subscribe(
    //     (response) => {
    //       // Assuming the API response has a "message" property
    //       this.message = response.message;
    //     },
    //     (error) => {
    //       console.error('Error fetching data:', error);
    //     }
    //   );
    return this.http.get('/api/test', {responseType:'json'})
      .subscribe((data: any) => {
        console.log(data['message'])
        this.message = data['message']
      })
  }
}
