import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HotelDto} from '../../services/models/hotel-dto';
import {FormsModule} from '@angular/forms';
import {updateHotel} from '../../services/fn/hotel-controller/update-hotel';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit{


  @Input() hotel :any

  @Input()cities :any

  @Output() updateHotel=new EventEmitter<HotelDto>()

  @Output( ) closeEdit =new EventEmitter<boolean>()

  editedHotel:any
  onUpdate(){


    console.log("from edited "+this.editedHotel)

    this.updateHotel.emit(this.editedHotel);


  }

  ngOnInit() {

    this.editedHotel={...this.hotel}


  }

  onClose(){

    this.closeEdit.emit(false)


}






}
