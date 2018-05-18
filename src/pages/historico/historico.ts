import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistoricoProvider } from "../../providers/historico/historico";
import { Historico, HistoricoList } from "../../models/historico";

/**
 * Generated class for the HistoricoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html',
    providers: [
      HistoricoProvider
    ]
})
export class HistoricoPage {

 historico: Historico;
 historicolist: HistoricoList[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private historicoProvider: HistoricoProvider
  ) {
  }

  ionViewDidLoad() {
    this.historicoProvider.getAll()
    .then( results =>{
        this.historicolist = results;
      console.log(results);
    });
  }

  apagaHistorico(){
    this.historicoProvider.clear();
  }

}
