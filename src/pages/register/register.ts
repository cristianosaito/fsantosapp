import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../models/user';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from "../login/login";
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

  user = {} as Usuario;

  constructor(
    private ofAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  async register(user: Usuario) {
      this.ofAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(data =>{
        console.log(data);
        this.navCtrl.setRoot(ProfilePage);
      })
      .catch(error=>{
        console.log(error);
      });
  }
}
