import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PerfilPage } from "../perfil/perfil";
import { Usuario } from '../../models/user';
import { Profile } from "../../models/profile";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from "angularfire2/database";
import { ImageProvider } from '../../providers/image/image';
import { ValidaCpfProvider } from "../../providers/valida-cpf/valida-cpf";

/**
 * Generated class for the EditPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-perfil',
  templateUrl: 'edit-perfil.html',
  providers: [
    ValidaCpfProvider
  ]
})
export class EditPerfilPage {

  imagem: string;
  has_img: boolean = false;
  user = {} as Usuario;
  profile = {} as Profile;

  @ViewChild('cpfInput') cpfInput;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    private ofAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private imageSrv: ImageProvider,
    public validaCpf: ValidaCpfProvider,
    private toastCtrl: ToastController
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

  mascara_cpf_cnpj() {
    var dig = this.profile.cpf;

    if (dig.length == 11) {
      dig.split("");

      let cpf_formatado = dig[0] + dig[1] + dig[2] + '.' + dig[3] + dig[4] + dig[5] + '.' + dig[6] + dig[7] + dig[8] + '-' + dig[9] + dig[10];

      let validou = this.validaCpf.validaCPF(this.profile.cpf);

      this.profile.cpf = cpf_formatado;

      if (!validou) {
        this.presentToast('CPF inválido');
        this.profile.cpf = '';
        this.cpfInput.setFocus();
      }

    } else if (dig.length == 14) {

      dig.split("");

      let cnpj_formatado = dig[0] + dig[1] + '.' + dig[2] + dig[3] + dig[4] + '.' + dig[5] + dig[6] + dig[7] + '/' + dig[8] + dig[9] + dig[10] + dig[11] + '-' + dig[12] + dig[13];

      this.profile.cpf = cnpj_formatado;

      let validou = this.validaCpf.validaCNPJ(this.profile.cpf);

      if (!validou) {
        this.presentToast('CNPJ inválido');
        this.profile.cpf = '';
        this.cpfInput.setFocus();
      }

    } else {
      this.presentToast('Favor verificar o CPF/CNPJ');
    }
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }


  goPerfilPage() {
    this.navCtrl.push(PerfilPage);
  }



  ionViewDidLoad() {
    
  }

}
