import { Routes } from '@angular/router';
import {HotelsListComponent} from './pages/hotels-list/hotels-list.component';
import {AddHotelComponent} from './pages/add-hotel/add-hotel.component';

export const routes: Routes = [
  { path: 'add-hotel', component: AddHotelComponent },
  { path: 'hotels-list', component: HotelsListComponent },
  { path: '', redirectTo: 'hotels-list', pathMatch: 'full' }, // default route
];
