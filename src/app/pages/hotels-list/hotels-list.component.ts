import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HotelControllerService} from '../../services/services/hotel-controller.service';
import {hotels, Hotels$Params} from '../../services/fn/hotel-controller/hotels';
import {HotelDto} from '../../services/models/hotel-dto';
import {updateHotel} from '../../services/fn/hotel-controller/update-hotel';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CityDto} from '../../services/models/city-dto';

@Component({
  selector: 'app-hotels-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './hotels-list.component.html',
  styleUrl: './hotels-list.component.scss'
})
export class HotelsListComponent implements OnInit{


  imagesLink: String = 'http://localhost:5001/hotels/image/'
  /*
  export interface Hotels$Params {     name?: string     stars?: number
  city?: number     page?: number
    items?: number }
   */


  filter:  Hotels$Params = {
    items: 10
  };

  availableCities: CityDto[] = [];
  hotels: HotelDto[] = [];


  constructor(private hotelService: HotelControllerService) {


  }

  handleStarsChange(star:number){


    this.filter.stars=star;


    this.loadHotels();



  }



  ngOnInit() {


    console.log("component init ,fetching hotels ...");


    this.loadHotels();


    this.availableCities = [
      { id: 1, name: 'New York' },
      { id: 2, name: 'Paris' },
      { id: 3, name: 'Tokyo' },
      { id: 4, name: 'London' },
      { id: 5, name: 'Dubai' }
    ];

  }

  loadHotels() {


    const params: Hotels$Params = {}

    if (this.filter.name != undefined) params.name = this.filter.name;
    if (this.filter.city != undefined) params.city = this.filter.city;
    if (this.filter.stars != undefined) params.stars = this.filter.stars;
    if (this.filter.items != undefined) params.items = this.filter.items;
    if (this.filter.page != undefined) params.page = this.filter.page;

    console.log("staars :"+ params.stars)
    this.hotelService.hotels(params).subscribe(
      {
        next: (hotels) => {

          // @ts-ignore
          hotels.forEach(h=>console.log("images : "+this.imagesLink+encodeURIComponent(h.imageName??'x')))


          this.hotels = hotels;
        },
        error: (err) => console.log("error")
      }
    )


  }
  getImageUrl(imageName: string | undefined): string {
    // Fallback to empty string if undefined
    return this.imagesLink + encodeURIComponent(imageName || '');
  }

  protected readonly encodeURIComponent = encodeURIComponent;
}

