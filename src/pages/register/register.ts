import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../models/user';
import { TabsPage } from '../tabs/tabs';

import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  usuario = {} as Usuario;

  constructor(
    private ofAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  async register(usuario: Usuario) {
      this.ofAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then(data =>{
        console.log(data);
        this.navCtrl.setRoot(TabsPage);
      })
      .catch(error=>{
        console.log(error);


      });
  }
}
