import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NcmProvider } from '../../providers/ncm/ncm';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the CotacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cotacao',
  templateUrl: 'cotacao.html',
    providers: [
      NcmProvider
    ]
})
export class CotacaoPage {

  dolar: any ;
  dolar_ontem:any;
  euro: any ;
  euro_ontem:any;
  yene: any ;
  yene_ontem:any;
  libra: any ;
  libra_ontem:any;

  data:Date =new Date();
  data_show: string = this.data.getDay()+'/'+this.data.getMonth()+'/'+this.data.getFullYear();


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public ncmProvider: NcmProvider,
    public http: Http
    ) {
      this.getCotacao(1);
      this.getCotacao(21619);
      this.getCotacao(21621);
      this.getCotacao(21623);
  }

  async getCotacao(moeda:any){
 
    this.http.get("http://agenciafeeshop.com.br/fsantosapp/getcotacao.php?codigo=" + moeda).subscribe(
      data => {
        const response = (data as any);
        const obj_retorno = JSON.parse(response._body);
        this.setMoedas(moeda,obj_retorno);
        console.log(obj_retorno);
      
      }
    );

  }

  setMoedas(moeda:any,dado:any){

    let valor = this.formataReal(parseFloat(dado));

    switch (moeda) {
      case 1:
        this.dolar = valor;
        break;
    
      case 21619:
        this.euro = valor;
        break;

      case 21623:
        this.libra = valor;
        break;

      case 21621:
        this.yene = valor;
        break;
    }
  }

  formataReal(num) {
    num = (parseFloat(num)).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return num;
  }


  ionViewDidLoad() {
  
   
  }

}
