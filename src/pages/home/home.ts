import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NcmProvider } from '../../providers/ncm/ncm';
import { CalculoProvider } from '../../providers/calculo/calculo';
import { ResultPage } from '../result/result';
import { SearchPage} from '../search/search';
import { NavController, NavParams } from 'ionic-angular';
import { HistoricoProvider } from "../../providers/historico/historico";
import { Historico } from "../../models/historico";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    NcmProvider
  ]
})
export class HomePage {
  historico: Historico;
  historicSimulation: Historico;

  simulacao: any = {};
  showForm:boolean = true;
  showResult:boolean = false;
  ncm_get:any;
  ncm_search:any;
  valor_search:any;
  peso_search: any;
  quantidade_search:any;
  fromHistory:string;
   
  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public ncmProvider: NcmProvider,
    public calculoProvider: CalculoProvider,
    public formBuilder: FormBuilder,
    private historicoProvider: HistoricoProvider
  ) {
    this.historicSimulation = navParams.get('historicSimulation');

    this.fromHistory = navParams.get('fromHistory');

    if (this.fromHistory == 'same') {
      this.submitFormSimulacaoHistory();
    }

    if (this.fromHistory == 'new') {
      this.ncm_search = this.historicSimulation.ncm;
      this.valor_search = this.historicSimulation.valor;
      this.peso_search = this.historicSimulation.peso;
      this.quantidade_search = this.historicSimulation.quantidade;
    }

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
        let dolardia = obj_retorno.dolardia;
  
        this.calculoProvider.setImpostos(categoria,descricao,ipi,tec,pis,cofins,moeda,cambio,dolardia);

        this.historico = new Historico();
        this.historico.ncm = this.calculoProvider.ncm;
        this.historico.categoria = categoria;
        this.historico.descricao = descricao;
        this.historico.valor = inputs.valor_uni;
        this.historico.moeda = moeda;
        this.historico.peso = inputs.peso_uni;
        this.historico.quantidade = inputs.quantidade;
        this.historico.modal = inputs.modal;
        this.historico.origem = inputs.origem;
        this.historico.destino = inputs.destino;
        this.historicoProvider.insert(this.historico);

      }, error => {
        console.log(error);
      }
    )
    this.goToResultPage();
    this.simulacao.reset();
  }

  submitFormSimulacaoHistory() {
    this.calculoProvider.ncm = this.historicSimulation.ncm;
    this.calculoProvider.moeda = this.historicSimulation.moeda;
    this.calculoProvider.valor_uni = this.historicSimulation.valor;
    this.calculoProvider.peso_uni = this.historicSimulation.peso;
    this.calculoProvider.quantidade = this.historicSimulation.quantidade;
    this.calculoProvider.modal = this.historicSimulation.modal;
    this.calculoProvider.origem = this.historicSimulation.origem;
    this.calculoProvider.destino = this.historicSimulation.destino;

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
        let dolardia = obj_retorno.dolardia;

        this.calculoProvider.setImpostos(categoria, descricao, ipi, tec, pis, cofins, moeda, cambio, dolardia);

        this.historico = new Historico();
        this.historico.ncm = this.calculoProvider.ncm;
        this.historico.categoria = categoria;
        this.historico.descricao = descricao;
        this.historico.valor = this.historicSimulation.valor;
        this.historico.moeda = moeda;
        this.historico.peso = this.historicSimulation.peso;
        this.historico.quantidade = this.historicSimulation.quantidade;
        this.historico.modal = this.historicSimulation.modal;
        this.historico.origem = this.historicSimulation.origem;
        this.historico.destino = this.historicSimulation.destino;
        this.historicoProvider.insert(this.historico);

      }, error => {
        console.log(error);
      }
    )
    this.goToResultPage();
  }

  goToResultPage() {
    this.navCtrl.push(ResultPage);
  }
  goToSearchPage() {
    this.navCtrl.push(SearchPage);
  }
}
