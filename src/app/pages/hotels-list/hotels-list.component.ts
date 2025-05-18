import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HotelControllerService} from '../../services/services/hotel-controller.service';
import {hotels, Hotels$Params} from '../../services/fn/hotel-controller/hotels';
import {HotelDto} from '../../services/models/hotel-dto';
import {updateHotel} from '../../services/fn/hotel-controller/update-hotel';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CityDto} from '../../services/models/city-dto';
import {HotelCardComponent} from '../../components/hotel-card/hotel-card.component';
import {EditProductComponent} from '../../components/edit-product/edit-product.component';

@Component({
  selector: 'app-hotels-list',
  imports: [CommonModule, FormsModule, HotelCardComponent, EditProductComponent],
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



  edit:boolean=false;

  editedHotel:any
  filter:  Hotels$Params = {
    items: 10
  };

  availableCities: CityDto[] = [];
  hotels: HotelDto[] = [];
  filteredHotels: HotelDto[] = [];



  constructor(private hotelService: HotelControllerService) {


  }

  handleStarsChange(star:number){


    this.filter.stars=star;


    this.loadHotelsLocally()



  }




  ngOnInit() {


    console.log("component init ,fetching hotels ...");


    //this.loadHotels();



    this.availableCities = [
      { id: 1, name: 'New York' },
      { id: 2, name: 'Paris' },
      { id: 3, name: 'Tokyo' },
      { id: 4, name: 'London' },
      { id: 5, name: 'Dubai' }
    ];

    this.hotels = [
      { id: 1, name: "Grand Palace Hotel", address: "123 Main St", city: this.availableCities[0], stars: 5, imageName: "grand-palace.jpg" },
      { id: 2, name: "Seaside Resort", address: "456 Ocean Drive", city: this.availableCities[1], stars: 4, imageName: "seaside-resort.jpg" },
      { id: 3, name: "Mountain Lodge", address: "789 Hilltop Rd", city: this.availableCities[2], stars: 3 },
      { id: 4, name: "Bayview Inn", address: "321 Bay St", city: this.availableCities[3], stars: 4, imageName: "bayview-inn.jpg" },
      { id: 5, name: "City Center Hotel", address: "654 Downtown Ave", city: this.availableCities[0], stars: 4 },
      { id: 6, name: "Sunset Motel", address: "987 Sunset Blvd", city: this.availableCities[1], stars: 2, imageName: "sunset-motel.jpg" },
      { id: 7, name: "Peak Hotel", address: "147 Mountain Rd", city: this.availableCities[2], stars: 5, imageName: "peak-hotel.jpg" },
      { id: 8, name: "Golden Gate Suites", address: "258 Golden Gate Way", city: this.availableCities[3], stars: 5 }
    ];
this.filteredHotels=this.hotels
  }


  loadHotelsLocally() {

    this.filteredHotels=this.hotels

    console.log("filters :"+JSON.stringify(this.filter))

    if (this.filter.name) {
      const nameFilter = this.filter.name.toLowerCase();
      this.filteredHotels = this.filteredHotels.filter(hotel =>
        hotel.name.toLowerCase().includes(nameFilter)
      );
    }

    if (this.filter.city !== undefined) {
      this.filteredHotels = this.filteredHotels.filter(hotel =>
        hotel.city !== undefined && hotel.city.id === Number(this.filter.city)
      );
    }

    if (this.filter.stars !== undefined) {
      this.filteredHotels = this.filteredHotels.filter(hotel =>
        hotel.stars === this.filter.stars
      );
    }
/*
    const itemsPerPage = this.filter.items ?? 10;
    const currentPage = this.filter.page ?? 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
*/

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

  onHotelDelete(hotel: number) {
    this.hotels = this.hotels.filter(h=>h.id!=hotel);
    console.log(this.hotels)
    this.loadHotelsLocally()
  }
  onHotelEdit(hotel: HotelDto) {

    console.log("hotel ready for editing "+JSON.stringify(hotel))
   this.editedHotel=hotel
  }

  onClose(edited:boolean){

    this.editedHotel=null;

  }

  applyEdit(hotel:HotelDto){

console.log("ready to update hotel..")
console.log(hotel.id)
  for(let i=0;i<this.hotels.length;++i){
    if(this.hotels[i].id==hotel.id)
      this.hotels[i]=hotel
  }

  }


  protected readonly encodeURIComponent = encodeURIComponent;
}

