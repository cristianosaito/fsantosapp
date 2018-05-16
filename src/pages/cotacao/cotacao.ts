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

  libraIcon: string;
  dolarIcon: string;
  yeneIcon: string;
  euroIcon: string;

  dolar: any ;
  dolar_ontem:any;
  euro: any ;
  euro_ontem:any;
  yene: any ;
  yene_ontem:any;
  libra: any ;
  libra_ontem:any;

  moeda_1:any;
  moeda_2:any;

  data_show: any ;
  
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
      this.data_show = this.dataFormatada();
  }

  async getCotacao(moeda:any){
 
    this.http.get("http://agenciafeeshop.com.br/fsantosapp/getcotacao.php?codigo=" + moeda).subscribe(
      data => {
        const response = (data as any);
        const obj_retorno = JSON.parse(response._body);
        this.setMoedas(moeda, obj_retorno.valor_dia, obj_retorno.valor_dia_anterior);
        console.log(obj_retorno);
      
      }
    );

  }

  setMoedas(moeda:any,dado:any, dado2:any){

    let valor = this.formataReal(parseFloat(dado));
    let valor2 = this.formataReal(parseFloat(dado2));

    let icon;

    if (valor > valor2) {
      icon = "arrow-round-up";
    } else if (valor < valor2){
      icon = "arrow-round-down";
    } else if (valor == valor2){
      icon = "";

    }
console.log(valor,valor2,icon);

    switch (moeda) {
      case 1:
        this.dolar = valor;
        this.dolar_ontem = valor2;
        this.dolarIcon = icon;
        break;
    
      case 21619:
        this.euro = valor;
        this.euro_ontem = valor2;
        this.euroIcon = icon;
        break;

      case 21623:
        this.libra = valor;
        this.libra_ontem = valor2;
        this.libraIcon = icon;
        break;

      case 21621:
        this.yene = valor;
        this.yene_ontem = valor2;
        this.yeneIcon = icon;
        break;
    }
  }

  formataReal(num) {
    num = (parseFloat(num)).toLocaleString('pt-BR', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    });
    return num;
  }

dataFormatada(){
  var data = new Date();

  var dia = data.getDate();
  var dias = dia.toString();
  if (dias.length == 1)
    dias = "0" + dias;

  var mes = data.getMonth() + 1;
  var mess = mes.toString();
  if (mess.length == 1)
    mess = "0" + mess;

  var ano = data.getFullYear();

  return dias + "/" + mess + "/" + ano;
}
  ionViewDidLoad() {
  
   
  }

}
