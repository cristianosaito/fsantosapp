import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../models/user';
import { Profile } from "../../models/profile";
import { LoginPage } from "../login/login";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from "angularfire2/database";
import { TabsPage } from '../tabs/tabs';
import { PoliticaPage } from '../politica/politica';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as Usuario;
  profile = {} as Profile;
  termos:boolean = false;

  constructor(
    private ofAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  async register(user: Usuario) {
      this.ofAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(data =>{
        console.log(data);
        this.createProfile();
      })
      .catch(error=>{
        console.log(error);
      });
  }

  createProfile() {
    this.ofAuth.authState.take(1).subscribe(
      auth => {
        this.profile.email = auth.email;
        console.log(auth.email);
        this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
          .then(() => this.navCtrl.setRoot(TabsPage))
      }
    )
  }

  goLoginPage(){
    this.navCtrl.push(LoginPage);
  }

  goTermoPage(){
    this.navCtrl.push(PoliticaPage);

  }
}
