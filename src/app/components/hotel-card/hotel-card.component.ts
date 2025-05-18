import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HotelDto} from '../../services/models/hotel-dto';


@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss'] // or .css if you're using that
})
export class HotelCardComponent {

  @Input() hotel!: HotelDto;

  @Output() deleteHotel = new EventEmitter<number>();

  onDelete() {

    this.deleteHotel.emit(this.hotel.id);


  }
  @Output() editHotel = new EventEmitter<HotelDto>();

  onEdit() {

    this.editHotel.emit(this.hotel);


  }


}
