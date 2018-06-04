import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the RecuperaSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-recupera-senha',
  templateUrl: 'recupera-senha.html',
})
export class RecuperaSenhaPage {

  email:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private ofAuth: AngularFireAuth,
    
) {
  }

  recuperaSenha(){
    this.ofAuth.auth.sendPasswordResetEmail(this.email).then(function () {
      // Email sent.
      this.exibeToast("Senha enviada para o e-mail cadastrado");
    }).catch(function (error) {
      // An error happened.
    });
  }

  exibeToast(msg:string){
    let toast = this.toastCtrl.create({ duration: 3000, position: 'top' });
    toast.setMessage(msg);
    toast.present();
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
   
  }

}
