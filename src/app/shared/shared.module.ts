import { NgModule } from "@angular/core";

import { LocationComponent } from "../shared/pickers/location/location.component";
import { MapModalComponent } from "../shared/map-modal/map-modal.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [LocationComponent, MapModalComponent],
  exports: [LocationComponent, MapModalComponent],
  entryComponents: [MapModalComponent],
})
export class SharedModule {}
