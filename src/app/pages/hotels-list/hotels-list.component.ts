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
import {CityControllerService} from '../../services/services/city-controller.service';

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
    items: 10,
    city: 0
  };

  availableCities: CityDto[] = [];
  hotels: HotelDto[] = [];
  filteredHotels: HotelDto[] = [];



  constructor(private hotelService: HotelControllerService,private cityService :CityControllerService) {


  }

  handleStarsChange(star:number){


    this.filter.stars=star;


    this.loadHotels()




  }




  ngOnInit() {


    console.log("component init ,fetching hotels ...");


    //this.loadHotels();

    this.cityService.cityDtos().subscribe(cities => {
      //console.log(cities); // array of CityDto objects
      this.availableCities=cities
    });



    this.loadHotels()

    console.log("Available cities : "+this.availableCities)






  }

loadCities(){

  this.cityService.cityDtos().subscribe(cities => {
    console.log(cities); // array of CityDto objects
    this.availableCities=cities;
  });

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

    if (this.filter.name != undefined ) params.name = this.filter.name;
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

  applyEdit(request:any){


    console.log("edit from parent")

    this.hotelService.updateHotel(request).
    subscribe({
      next: (updatedHotel) => {
        // handle success

        this.editedHotel=null;
        this.loadHotels()
      },
      error: (err) => {
        // handle error
        console.error(err);
      }
    });




  }


  protected readonly encodeURIComponent = encodeURIComponent;
}

