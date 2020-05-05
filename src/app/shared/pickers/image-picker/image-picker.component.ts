import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from "@angular/core";
import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType,
} from "@capacitor/core";
import { Platform } from "@ionic/angular";
const { LocalNotifications } = Plugins;

@Component({
  selector: "image-picker",
  templateUrl: "./image-picker.component.html",
  styleUrls: ["./image-picker.component.scss"],
})
export class ImagePickerComponent implements OnInit {
  @ViewChild("filePicker", { static: false }) filePickerRef: ElementRef<
    HTMLInputElement
  >;
  selectedImage: string;
  @Output() imagePicked = new EventEmitter<string>();
  useFilePicker = false;

  constructor(private platform: Platform) {}

  ngOnInit() {
    if (
      this.platform.is("desktop") ||
      (this.platform.is("mobile") && !this.platform.is("hybrid"))
    ) {
      this.useFilePicker = true;
    }
  }
  onPickImage() {
    if (!Capacitor.isPluginAvailable("Camera")) {
      // || this.useFilePicker) {
      this.filePickerRef.nativeElement.click();
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      width: 300,
      resultType: CameraResultType.Base64,
    })
      .then(async (image) => {
        this.selectedImage = "data:image/jpeg;base64," + image.base64String;
        this.imagePicked.emit(this.selectedImage);
        LocalNotifications.requestPermission().then(async (perms) => {
          if (perms.granted) {
            var notifications = await LocalNotifications.schedule({
              notifications: [
                {
                  title: "BnB ionic",
                  body: "Your photo is recognized and approved!",
                  id: 1,
                  schedule: { at: new Date(Date.now() + 1000 * 3) },
                  sound: null,
                  attachments: null,
                  actionTypeId: "",
                  extra: null,
                },
              ],
            }).catch((err) => {
              console.log(err);
            });
          } else {
            console.log("No notification permissions");
          }
        });
      })
      .catch((err) => {
        console.log(err);
        this.filePickerRef.nativeElement.click();
      });
  }
  onFileSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedImage = reader.result.toString();
      this.imagePicked.emit(this.selectedImage);
    };
  }
}
