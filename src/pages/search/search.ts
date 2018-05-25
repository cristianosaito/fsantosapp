import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NcmProvider } from '../../providers/ncm/ncm';
import { Validators, FormBuilder } from '@angular/forms';
import { HomePage } from "../home/home";
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers:[
    NcmProvider
  ]
})
export class SearchPage {

  showNcmDiv: boolean = false;
  showTermoDiv: boolean = false;
  showCatDiv: boolean = false;
  showCatReturn: boolean = false;
  ncmGroup: any = {};
  termoGroup: any = {};
  catGroup: any = {};
  resultGroup:any = {};
  ncm_get:any;

  public lista_ncm = new Array<any>();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public NcmProvider: NcmProvider,
    public formBuilder: FormBuilder
  ) {
    this.ncmGroup = this.formBuilder.group({
      ncm: ['', Validators.required]
    });
    this.termoGroup = this.formBuilder.group({
      termo: ['', Validators.required]
    });
    this.catGroup = this.formBuilder.group({
      categoria: ['', Validators.required]
    });
    this.resultGroup = this.formBuilder.group({
      result: ['', Validators.required]
    });

    this.ncm_get = this.navParams.get('ncm');

    if (this.ncm_get != null) {
      if (this.ncm_get.search(/[\D]/)) {
        this.showFormNCM();
        this.submitFormNCMParamentro(this.ncm_get);
        
      }else{
        this.showFormTermo();
        this.submitFormTermoParamentro(this.ncm_get);

      }      
    }
  }
  
  showFormNCM(){
    this.showNcmDiv = true;
    this.showTermoDiv = false;
    this.showCatDiv = false;
  }

  showFormTermo(){
    this.showNcmDiv = false;
    this.showTermoDiv = true;
    this.showCatDiv = false;

  }

  showFormCat() {
    this.showNcmDiv = false;
    this.showTermoDiv = false;
    this.showCatDiv = true;

  }

  submitFormNCM() {
    let ncm: any = this.ncmGroup.value;
    ncm = ncm.ncm;
    this.NcmProvider.getNcmByNumber(ncm).subscribe(
      data => {
        const response = (data as any);
        const obj_retorno = JSON.parse(response._body);
        this.lista_ncm = obj_retorno;
        console.log(obj_retorno);
        this.showCatReturn = true;
      }, error => {
        console.log(error);
      }
    )
  }

  submitFormNCMParamentro(ncm) {
      this.NcmProvider.getNcmByNumber(ncm).subscribe(
      data => {
        const response = (data as any);
        const obj_retorno = JSON.parse(response._body);
        this.lista_ncm = obj_retorno;
        console.log(obj_retorno);
        this.showCatReturn = true;
      }, error => {
        console.log(error);
      }
    )
  }
  submitFormTermo() {
    let termo: any = this.termoGroup.value;
    termo = termo.termo;
    this.NcmProvider.getNcmByTermo(termo).subscribe(
      data => {
        const response = (data as any);
        const obj_retorno = JSON.parse(response._body);
        this.lista_ncm = obj_retorno;
        this.showCatReturn = true;
        console.log(obj_retorno);
      }, error => {
        console.log(error);
      }
    )
  }

  submitFormTermoParamentro(termo) {
    this.NcmProvider.getNcmByTermo(termo).subscribe(
      data => {
        const response = (data as any);
        const obj_retorno = JSON.parse(response._body);
        this.lista_ncm = obj_retorno;
        this.showCatReturn = true;
        console.log(obj_retorno);
      }, error => {
        console.log(error);
      }
    )
  }

  submitFormCat(){
    let cat: any = this.catGroup.value;
    cat = cat.categoria;
    this.NcmProvider.getNcmByCat(cat).subscribe(
      data => {
        const response = (data as any);
        const obj_retorno = JSON.parse(response._body);
        this.lista_ncm = obj_retorno;
        console.log(obj_retorno);
        this.showCatReturn = true;

      }, error => {
        console.log(error);
      }
    )
  }

  submitFormResult(){
    let resultado: any = this.resultGroup.value;
    resultado = resultado.result;
    this.navCtrl.push(HomePage,{ncm:resultado});

    
  }

  ionViewDidLoad() {
  }
}
