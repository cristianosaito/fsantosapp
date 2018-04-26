//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the NcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NcmProvider {

  constructor(public http: Http) {
    console.log('Hello NcmProvider Provider');
  }

  getNcmByNumber(ncm:any){
    let url = "http://agenciafeeshop.com.br/fsantosapp/ncm.php/?ncm=" + ncm;
    return this.http.get(url);
  }

  getNcmByTermo(termo: any) {
    let url = "http://agenciafeeshop.com.br/fsantosapp/ncm.php/?termo=" +termo;
    return this.http.get(url);
  }

  getNcmByCat(cat: any) {
    let url = "http://agenciafeeshop.com.br/fsantosapp/ncm.php/?cat=" + cat;
    return this.http.get(url);
  }

  getImpostos(ncm: any, moeda:any) {
    let url = "http://agenciafeeshop.com.br/fsantosapp/getimposto.php?ncm=" + ncm + "&moeda=" + moeda;
    return this.http.get(url);
  }
}
