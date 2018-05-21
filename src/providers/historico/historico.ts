import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { Historico, HistoricoList } from '../../models/historico';
/*
  Generated class for the HistoricoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistoricoProvider {

  constructor(
    private storage: Storage, 
    private datepipe: DatePipe
  ) {
  }

  public insert(historico: Historico) {
    let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmms");
    historico.date = this.datepipe.transform(new Date(), "dd/MM/yyyy");
    return this.save(key, historico);
  }

  public update(key: string, historico: Historico) {
    return this.save(key, historico);
  }

  private save(key: string, historico: Historico) {
    return this.storage.set(key, historico);
  }

  public remove(key: string) {
    return this.storage.remove(key);
  }

  public clear(){
    return this.storage.clear();

  }

  public getAll() {

    let historicos: HistoricoList[] = [];

    return this.storage.forEach((value: Historico, key: string, iterationNumber: Number) => {
      let historico = new HistoricoList();
      historico.key = key;
      historico.historico = value;
      historicos.push(historico);
    })
      .then(() => {
        return Promise.resolve(historicos);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

}
