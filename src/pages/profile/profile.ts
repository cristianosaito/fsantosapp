import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Profile } from "../../models/profile";
import { TabsPage } from '../tabs/tabs';
 
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as Profile;

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, 
    public navParams: NavParams
  ) 
    {
  }

  createProfile(){
    this.afAuth.authState.take(1).subscribe(
      auth =>{
        this.profile.email = auth.email;
        console.log(auth.email);
        this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
          .then(() => this.navCtrl.setRoot(TabsPage))
      }
    )
  }
  
  ionViewDidLoad() {
    
  }

}
