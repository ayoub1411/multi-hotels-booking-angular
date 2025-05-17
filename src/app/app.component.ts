import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HotelsListComponent} from './pages/hotels-list/hotels-list.component';
import {Hotels$Params} from './services/fn/hotel-controller/hotels';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HotelsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'multihotels-booking';



}
