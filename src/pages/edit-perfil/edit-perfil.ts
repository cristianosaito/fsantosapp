import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PerfilPage } from "../perfil/perfil";
/**
 * Generated class for the EditPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-perfil',
  templateUrl: 'edit-perfil.html',
})
export class EditPerfilPage {
  imagem: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera
) {
    if (this.navParams.get('img')) {
      this.imagem = this.navParams.get('img');
    }
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imagem = 'data:image/jpeg;base64,' + imageData;
      console.log(this.imagem);
      this.goPerfilPage();

    }, (err) => {
      // Handle error
      console.log(err);

    });
  }

  openGallery() {
    const options: CameraOptions = {
      quality: 100,
      mediaType: this.camera.MediaType.ALLMEDIA,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imagem = 'data:image/jpeg;base64,' + imageData;
      this.goPerfilPage();
      
    }, (err) => {
      // Handle error
      console.log(err);

    });
  }

  goPerfilPage() {
    this.navCtrl.push(PerfilPage,{img:this.imagem});
  }

  ionViewDidLoad() {
  }

}
