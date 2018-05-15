import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { Validators, FormBuilder } from '@angular/forms';

/**
 * Generated class for the FirstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-first',
  templateUrl: 'first.html',
})
export class FirstPage {
  NCM_form: any = {};
  ncm_number:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder
  ) {
    this.NCM_form = this.formBuilder.group({
      ncm_number: ['', Validators.required]
    })
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstPage');
  }

}
