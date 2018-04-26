import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email:any;
  password:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public angularFireAuth: AngularFireAuth) {
  }

  sendEmailVerification() {
    this.angularFireAuth.authState.subscribe(user => {
      user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
        })
    });
  }

  register(email, password) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.sendEmailVerification()
      })
      .catch((err) => {
        //Do as you please here
      });
  }

  login(username, password) {
    this.angularFireAuth.auth.signInWithEmailAndPassword(username, password)
      .then((user) => {
        if (user.emailVerified) {
          // Redirect the user here 
        } else {
          // Tell the user to have a look at its mailbox 
        }
      });
  }

  sendPassword(email) {
    this.angularFireAuth.auth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('email sent');
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
