import { NgModule } from "@angular/core";

import { LocationComponent } from "../shared/pickers/location/location.component";
import { MapModalComponent } from "../shared/map-modal/map-modal.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ImagePickerComponent } from "./pickers/image-picker/image-picker.component";

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [LocationComponent, MapModalComponent, ImagePickerComponent],
  exports: [LocationComponent, MapModalComponent, ImagePickerComponent],
  entryComponents: [MapModalComponent],
})
export class SharedModule {}
