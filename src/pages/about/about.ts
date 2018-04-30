import { Component } from '@angular/core';
import { IonicPage,NavController } from 'ionic-angular';
import { ContactPage} from "../contact/contact";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }

  goToSearchPage() {
    this.navCtrl.push(ContactPage);
  }

}
