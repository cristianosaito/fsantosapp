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
  total_ipi:any;
  total_tec: any;
  total_pis: any;
  total_cofins: any;
  total_icms:any;

  //variáveis pelo input
  ncm: any;
  valor_uni: any;
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
  moeda: any;

  //variáeis calculadas
  cif:any;
  fob:any;
  icms:any;
  volume:any;
  frete:any;
  seguro: number;

  //variáveis formatadas para print na tela
  total_real_formatado: any;
  total_ipi_formatado: any;
  total_tec_formatado: any;
  total_pis_formatado: any;
  total_cofins_formatado: any;
  total_icms_formatado: any;
  valor_uni_formatado: any;
  cambio_formatado: any;
  cif_formatado: any;
  fob_formatado: any;
  frete_formatado:any;
  seguro_formatado:any;
  tx_total_formatado:any;

  //taxas
  tx_siscomex: number = 214.5;
  tx_exp: number = 300;
  tx_desc: number = 80;
  tx_lib: number = 80;
  tx_sda:number = 555;
  tx_honorario_desp:number = 954;
  tx_mar_merc:number = 0.25;
  tx_mar_thc:number = 1000;
  tx_total:number;

  //valor do dolar
  dolardia:any;

  calculaImpostos() {
    this.calculaFob();
    this.calculaVolume();
    this.calculaFrete();
    this.calculaSeguro();
    this.calculaCif();
    this.calculaII();
    this.calculaIPI();
    this.calculaPIS();
    this.calculaCOFINS();
    this.calculaICMS();
    this.calculaTaxas();
    this.calculaTotal();
  }

  setImpostos(categoria: any, descricao: any, ipi: any, tec: any, pis: any, cofins: any, moeda: any, cambio:any, dolardia:any){
    this.dolardia = dolardia;
    this.categoria = categoria.toUpperCase();
    this.descricao = descricao.toUpperCase();
    this.ipi = ipi;
    this.tec = tec;
    this.pis = pis;
    this.cofins = cofins;
    this.cambio = cambio;
    this.moeda = moeda.toUpperCase();
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
    this.total_ipi = ((parseFloat(this.cif) + parseFloat(this.tec)) * parseFloat(this.ipi)).toFixed(2);
    this.total_ipi_formatado = this.formataReal(this.total_ipi);
  }

  calculaII() {
    this.tec = this.tec.replace(',', '.');
    this.total_tec = (this.cif * parseFloat(this.tec)).toFixed(2);
    this.total_tec_formatado = this.formataReal(this.total_tec);
  }

  calculaPIS() {
    this.pis = this.pis.replace(',','.');
    this.total_pis = (this.cif * parseFloat(this.pis)).toFixed(2);
    this.total_pis_formatado = this.formataReal(this.total_pis);
  }

  calculaCOFINS() {
    this.cofins = this.cofins.replace(',', '.');
    this.total_cofins = (this.cif * parseFloat(this.cofins)).toFixed(2);
    this.total_cofins_formatado = this.formataReal(this.total_cofins);
  }

  calculaVolume(){
    this.volume = parseFloat(this.quantidade) * parseFloat(this.peso_uni);
  }

  calculaFrete(){
    if (this.modal == "ar") {
      this.frete = parseFloat(this.volume) * 10;
      this.modal = "AÉREO";
    } else if (this.modal == "mar") {
      if (this.volume > 7000) {
        this.frete = 2400;
      }else{
        this.frete = parseFloat(this.volume) * 0.3;
      }
      this.modal = "MARÍTIMO";
    }
    this.frete_formatado = this.formataReal(this.frete);
  }

  calculaSeguro(){
    this.seguro = parseFloat(this.fob) * 0.001;
    this.seguro_formatado = this.formataReal(this.seguro);
  }

  //calcula o valor FOB já em R$
  calculaFob() {
    this.fob = (parseFloat(this.valor_uni) * parseFloat(this.quantidade) * parseFloat(this.cambio)).toFixed(2);
    this.fob_formatado = this.formataReal(this.fob);
  }

  //calcula o valor CIF já em R$
  calculaCif() {
    let base = (parseFloat(this.valor_uni) * parseFloat(this.quantidade) * parseFloat(this.cambio));
    this.cif = (base + this.frete + this.seguro).toFixed(2);
    this.cif_formatado = this.formataReal(this.cif);
  }

   calculaICMS(){
    switch (this.destino) {
      case "SP":
        this.icms = 0.18;
        this.destino = "SÃO PAULO";
        break;

      case "AC":
        this.icms = 0.17;
        this.destino = "ACRE";
        break;

      case "AL":
        this.icms = 0.17;
        this.destino = "ALAGOAS";
        break;

      case "AP":
        this.icms = 0.17;
        this.destino = "AMAPÁ";
        break;

      case "AM":
        this.icms = 0.17;
        this.destino = "AMAZONAS";
        break;
      
      case "BA":
        this.icms = 0.17;
        this.destino = "BAHIA";
        break;

      case "CE":
        this.icms = 0.17;
        this.destino = "CEARÁ";
        break;

      case "DF":
        this.icms = 0.17;
        this.destino = "DISTRITO FEDERAL";
        break;

      case "ES":
        this.icms = 0.17;
        this.destino = "ESPIRITO SANTO";
        break;

      case "GO":
        this.icms = 0.17;
        this.destino = "GOIÁS";
        break;

      case "MA":
        this.icms = 0.17;
        this.destino = "MARANHÃO";
        break;

      case "MT":
        this.icms = 0.17;
        this.destino = "MATO GROSSO";
        break;

      case " MS":
        this.icms = 0.17;
        this.destino = "MATO GROSSO DO SUL";
        break;

      case "MG":
        this.icms = 0.18;
        this.destino = "MINAS GERAIS";
        break;

      case "PA":
        this.icms = 0.17;
        this.destino = "PARÁ";
        break;

      case "PB":
        this.icms = 0.17;
        this.destino = "PARAÍBA";
        break;

      case "PR":
        this.icms = 0.18;
        this.destino = "PARANÁ";
        break;

      case "PE":
        this.icms = 0.17;
        this.destino = "PERNAMBUCO";
        break;

      case "PI":
        this.icms = 0.17;
        this.destino = "PIAUÍ";
        break;

      case "RJ":
        this.icms = 0.19;
        this.destino = "RIO DE JANEIRO";
        break;

      case "RN":
        this.icms = 0.17;
        this.destino = "RIO GRANDE DO NORTE";
        break;

      case "RS":
        this.icms = 0.17;
        this.destino = "RIO GRANDE DO SUL";
        break;

      case "RO":
        this.icms = 0.17;
        this.destino = "RONDÔNIA";
        break;

      case "RR":
        this.icms = 0.17;
        this.destino = "RORAIMA";
        break;

      case "SC":
        this.icms = 0.17;
        this.destino = "SANTA CATARINA";
        break;

      case "SE":
        this.icms = 0.17;
        this.destino = "SERGIPE";
        break;

      case "TO":
        this.icms = 0.17;
        this.destino = "TOCANTINS";
        break;
        
    }
    let base = (parseFloat(this.cif) + parseFloat(this.tec) + parseFloat(this.pis) + parseFloat(this.cofins) + parseFloat(this.ipi));
    base = base / (1-this.icms);
    this.total_icms = (base * parseFloat(this.icms)).toFixed(2);
    this.total_icms_formatado = this.formataReal(this.total_icms);
  }

  calculaTaxas(){
    this.tx_total = this.tx_siscomex + this.tx_exp + this.tx_honorario_desp + (this.tx_desc * parseFloat(this.dolardia)) + (this.tx_lib * parseFloat(this.dolardia)) + this.tx_sda;
    
    if (this.modal == "MARÍTIMO") {
      this.tx_total = this.tx_total + (this.tx_mar_merc * parseFloat(this.frete)) + this.tx_mar_thc ;
    }
    this.tx_total_formatado = this.formataReal(this.tx_total);
  }

  calculaTotal() {
    this.total_real = this.tx_total + parseFloat(this.icms) + parseFloat(this.cif) + parseFloat(this.ipi) + parseFloat(this.tec) + parseFloat(this.ipi) + parseFloat(this.pis) + parseFloat(this.cofins);
    this.total_real_formatado = this.formataReal(this.total_real);
  }

  formataReal(num){
    num = (parseFloat(num)).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });   
    return num;
  }

  ionViewDidLoad() {
    
  }
}
