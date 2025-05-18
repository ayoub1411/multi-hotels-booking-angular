import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HotelDto} from '../../services/models/hotel-dto';
import {FormsModule} from '@angular/forms';
import {updateHotel, UpdateHotel$Params} from '../../services/fn/hotel-controller/update-hotel';
import {HotelControllerService} from '../../services/services/hotel-controller.service';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit{


  constructor(private service:HotelControllerService) {
  }




  @Input() hotel :any

  @Input()cities :any

  @Output() updateHotelEmitter=new EventEmitter<UpdateHotel$Params>()

  @Output( ) closeEdit =new EventEmitter<boolean>()

  editedHotel:any

  selectedImage?: Blob;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }

  }

  onUpdate(){


    console.log("from edited "+this.editedHotel)



    const params:UpdateHotel$Params={id:this.hotel.id
      ,body:{

        hotel:{name:this.editedHotel.name,stars:this.editedHotel.stars,

          cityId:this.editedHotel.city.id,address:this.editedHotel.address}

        ,image:this.selectedImage
      }


    }
    //emit request update to parent component
    this.updateHotelEmitter.emit(params);






  }

  ngOnInit() {

    this.editedHotel={...this.hotel}


  }

  onClose(){

    this.closeEdit.emit(false)


}


editHotel(){


}





}
