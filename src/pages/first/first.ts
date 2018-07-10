import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { Validators, FormBuilder } from '@angular/forms';
import { Historico, HistoricoList } from "../../models/historico";
import { HistoricoProvider } from "../../providers/historico/historico";
import { HistoricoPage } from "../historico/historico";
/**
 * Generated class for the FirstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-first',
  templateUrl: 'first.html',
  providers: [
    HistoricoProvider
  ]
})
export class FirstPage {
  NCM_form: any = {};
  ncm_number:any;

  historico: Historico;
  historicolist: HistoricoList[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder,
    private historicoProvider: HistoricoProvider

  ) {
    this.NCM_form = this.formBuilder.group({
      ncm_number: ['', Validators.required]
    });

    this.carregaHistorico();
  }

  submitFormNCM() {
    let inputs: any = this.NCM_form.value;
    //console.log(inputs);
    this.ncm_number = inputs.ncm_number;
    this.goToSearchPage(this.ncm_number);
  }

  goToSearchPage(destaque) {
    this.navCtrl.push(SearchPage, { ncm: destaque });
  }

  goToHistoricoPage() {
    this.navCtrl.push(HistoricoPage);
  }

  carregaHistorico(){
    this.historicoProvider.getAll()
      .then(results => {
        this.historicolist = results;
      });
  }

  ionViewDidLoad() {
  }
}
