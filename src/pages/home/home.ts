import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NcmProvider } from '../../providers/ncm/ncm';
import { CalculoProvider } from '../../providers/calculo/calculo';
import { ResultPage } from '../result/result';
import { SearchPage} from '../search/search';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    NcmProvider
  ]
})
export class HomePage {

  simulacao: any = {};
  showForm:boolean = true;
  showResult:boolean = false;
  ncm_get:any;
  ncm_search:any;
   
  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public ncmProvider: NcmProvider,
    public calculoProvider: CalculoProvider,
    public formBuilder: FormBuilder
  ) {
   this.simulacao = this.formBuilder.group({
     ncm_number:['',Validators.required],
     moeda: ['',Validators.required], 
     valor_uni:['',Validators.required],
     quantidade: ['', Validators.required],
     peso_uni:['',Validators.required],
     modal:['',Validators.required],
     origem:['',Validators.required],
     destino:['',Validators.required]
   })

    this.ncm_get = this.navParams.get('ncm');

    if (this.ncm_get != null) {
      this.ncm_search = this.ncm_get;
    }
        
  }

  submitFormSimulacao(){
    let inputs: any = this.simulacao.value;
    //console.log(inputs);
    this.calculoProvider.ncm = inputs.ncm_number;
    this.calculoProvider.moeda = inputs.moeda;
    this.calculoProvider.valor_uni = inputs.valor_uni;
    this.calculoProvider.peso_uni = inputs.peso_uni;
    this.calculoProvider.quantidade = inputs.quantidade;
    this.calculoProvider.modal = inputs.modal;
    this.calculoProvider.origem = inputs.origem;
    this.calculoProvider.destino = inputs.destino;
   
    this.ncmProvider.getImpostos(this.calculoProvider.ncm, this.calculoProvider.moeda).subscribe(
      data => {
        const response = (data as any);
        const obj_retorno = JSON.parse(response._body);
        
       let categoria = obj_retorno.CATEGORIA;
       let descricao = obj_retorno.DESCRICAO;
       let ipi = obj_retorno.IPI;
       let tec = obj_retorno.TEC;
       let pis = obj_retorno.PIS;
       let cofins = obj_retorno.COFINS;
       let moeda = obj_retorno.moeda;
       let cambio = obj_retorno.valor;

       this.calculoProvider.setImpostos(categoria,descricao,ipi,tec,pis,cofins,moeda,cambio);

      }, error => {
        console.log(error);
      }
    )

    this.goToResultPage();
    this.simulacao.reset();
}

  goToResultPage() {
    this.navCtrl.push(ResultPage);
  }

  goToSearchPage() {
    this.navCtrl.push(SearchPage);
  }


}
