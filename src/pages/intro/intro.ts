import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    
  }

  goRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

  goLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  ionViewDidLoad() {
  }

}
