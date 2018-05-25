import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PerfilPage } from "../perfil/perfil";
import { Usuario } from '../../models/user';
import { Profile } from "../../models/profile";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from "angularfire2/database";
import { ImageProvider } from '../../providers/image/image';

/**
 * Generated class for the EditPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-perfil',
  templateUrl: 'edit-perfil.html',
})
export class EditPerfilPage {

  imagem: string;
  has_img: boolean = false;
  user = {} as Usuario;
  profile = {} as Profile;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    private ofAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private imageSrv: ImageProvider
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
      this.has_img = true;
      //this.saveImage();
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
      //this.saveImage();
      this.has_img = true;
      
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

  saveImage() {
    this.ofAuth.authState.take(1).subscribe(
      data => {
        this.imageSrv.uploadImage(this.imagem, data.uid);
       
      });
  }

  updateProfile() {
    this.ofAuth.authState.take(1).subscribe(
      auth => {
        this.afDatabase.object(`profile/${auth.uid}`).update(this.profile)
          .then(() =>{
            this.updateAuthData();
            if (this.has_img) {
              this.saveImage() 
            }
            this.goPerfilPage();       
          }
        )
      }
    )
  }

  updateAuthData(){
    var user = this.ofAuth.auth.currentUser;
    var newPassword = this.user.password;
    var newEmail = this.profile.email;
    user.updatePassword(newPassword);
    user.updateEmail(newEmail);
  }

  goPerfilPage() {
    this.navCtrl.push(PerfilPage);
  }



  ionViewDidLoad() {
    
  }

}
