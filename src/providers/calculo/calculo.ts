//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CalculoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CalculoProvider {

  constructor(public http: Http) {
  }
  total_real:any;
  total_real_formatado:any;
  total_ipi:any;
  total_ipi_formatado: any;
  total_tec: any;
  total_tec_formatado: any;
  total_pis: any;
  total_pis_formatado: any;
  total_cofins: any;
  total_cofins_formatado: any;
  total_icms:any;
  total_icms_formatado: any;

  //variáveis pelo input
  ncm: any;
  valor_uni: any;
  valor_uni_formatado: any;
  peso_uni: any;
  quantidade: any;
  modal: any;
  origem: any;
  destino: any;

  //variáveis pelo webservice
  categoria: any;
  descricao: any;
  ipi: any;
  tec: any;
  pis: any;
  cofins: any;
  cambio: any;
  cambio_formatado:any;
  moeda: any;

  //variáeis calculadas
  icms:any;


  calculaImpostos() {
    this.calculaTotal();
    this.calculaCOFINS();
    this.calculaII();
    this.calculaIPI();
    this.calculaPIS();
    this.calculaICMS();
   
  }

  setImpostos(categoria: any, descricao: any, ipi: any, tec: any, pis: any, cofins: any, modal: any, moeda: any, cambio:any){
    this.categoria = categoria;
    this.descricao = descricao;
    this.ipi = ipi;
    this.tec = tec;
    this.pis = pis;
    this.cofins = cofins;
    this.cambio = cambio;
    this.modal = modal;
    this.moeda = moeda;

    this.calculaImpostos();

    this.cambio_formatado = this.formataReal(this.cambio);
    this.valor_uni_formatado = this.formataReal(this.valor_uni);

  }

  calculaIPI(){
    if (this.ipi == "NT") {
      this.ipi = 0;
    }else{
    this.ipi = this.ipi.replace(',', '.');

    }
    this.total_ipi = (this.total_real * parseFloat(this.ipi)).toFixed(2);
    this.total_ipi_formatado = this.formataReal(this.total_ipi);

  }
  calculaII() {
    this.tec = this.tec.replace(',', '.');
    this.total_tec = (this.total_real * parseFloat(this.tec)).toFixed(2);
    this.total_tec_formatado = this.formataReal(this.total_tec);

  }
  calculaPIS() {
    this.pis = this.pis.replace(',','.');
    this.total_pis = (this.total_real * parseFloat(this.pis)).toFixed(2);
    this.total_pis_formatado = this.formataReal(this.total_pis);

  }
  calculaCOFINS() {
    this.cofins = this.cofins.replace(',', '.');
    this.total_cofins = (this.total_real * parseFloat(this.cofins)).toFixed(2);
    this.total_cofins_formatado = this.formataReal(this.total_cofins);

  }

  calculaVolume(){

  }

  calculaTotal(){
    this.total_real = (parseFloat(this.valor_uni) * parseFloat(this.quantidade) * parseFloat(this.cambio)).toFixed(2);
    this.total_real_formatado = this.formataReal(this.total_real);   

  }

  calculaICMS(){
    switch (this.destino) {
      case "SP":
        this.icms = 0.18;
        break;

      case "AC":
        this.icms = 0.17;
        break;

      case "AL":
        this.icms = 0.17;
        break;

      case "AP":
        this.icms = 0.17;
        break;

      case "AM":
        this.icms = 0.17;
        break;
      
      case "BA":
        this.icms = 0.17;
        break;

      case "CE":
        this.icms = 0.17;
        break;

      case "DF":
        this.icms = 0.17;
        break;

      case "ES":
        this.icms = 0.17;
        break;

      case "GO":
        this.icms = 0.17;
        break;

      case "MA":
        this.icms = 0.17;
        break;

      case "MT":
        this.icms = 0.17;
        break;

      case " MS":
        this.icms = 0.17;
        break;

      case "MG":
        this.icms = 0.18;
        break;

      case "PA":
        this.icms = 0.17;
        break;

      case "PB":
        this.icms = 0.17;
        break;

      case "PR":
        this.icms = 0.18;
        break;

      case "PE":
        this.icms = 0.17;
        break;

      case "PI":
        this.icms = 0.17;
        break;

      case "RJ":
        this.icms = 0.19;
        break;

      case "RN":
        this.icms = 0.17;
        break;

      case "RS":
        this.icms = 0.17;
        break;

      case "RO":
        this.icms = 0.17;
        break;

      case "RR":
        this.icms = 0.17;
        break;

      case "SC":
        this.icms = 0.17;
        break;

      case "SE":
        this.icms = 0.17;
        break;

      case "TO":
        this.icms = 0.17;
        break;
        
    }
    this.total_icms = (this.total_real * parseFloat(this.icms)).toFixed(2);
    this.total_icms_formatado = this.formataReal(this.total_icms);

  }

  formataReal(num){
    num = (parseFloat(num)).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });   
    return num;
  }
}
