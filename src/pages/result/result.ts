import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NcmProvider } from '../../providers/ncm/ncm';
import { CalculoProvider } from '../../providers/calculo/calculo';
/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
    providers: [
      NcmProvider
    ]
})
export class ResultPage {
 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public calculoProvider: CalculoProvider
  ) {

  }


}
