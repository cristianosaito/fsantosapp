import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HistoricoProvider } from "../../providers/historico/historico";
import { Historico } from "../../models/historico";
import { HomePage } from "../home/home";
/**
 * Generated class for the HistoryDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-history-detail',
  templateUrl: 'history-detail.html',
  providers: [
    HistoricoProvider
  ]
})
export class HistoryDetailPage {

  key:string;

  historico: Historico;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private historicoProvider: HistoricoProvider) 
    {
    this.key = navParams.get('key');
  }

  ionViewDidLoad() {
    this.historicoProvider.get(this.key)
      .then(results => {
        this.historico = results;
      });
  }

  makeNewSimulation(){
    this.navCtrl.push(HomePage, { historicSimulation: this.historico, fromHistory:'new'});
  }

  makeSameSimulation(){
    this.navCtrl.push(HomePage, { historicSimulation: this.historico, fromHistory: 'same' });
  }

}
