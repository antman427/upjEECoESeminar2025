import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'starter.client';
  //forecasts: WeatherForecast[] = [];
  
  private http: HttpClient = inject(HttpClient);

  ngOnInit(): void {
    //this.getForecasts();
  }

  // getForecasts() {
  //   this.http.get<WeatherForecast[]>('/weatherforecast').subscribe({
  //     next: result => {
  //       this.forecasts = result;
  //     },
  //     error: error => console.error(error)
  //   });
  // }
}
