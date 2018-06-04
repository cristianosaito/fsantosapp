import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  contactForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    public http: Http,
    public toastCtrl: ToastController
) {
    this.contactForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      mensagem: [''],
    });
  }

  

  async sendContactForm(){
    let msg = this.contactForm.value;   
   
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this.http.post("http://agenciafeeshop.com.br/fsantosapp/envia_email_ajax.php", msg, options).subscribe(
      data => {
        const response = (data as any);
        //const obj_retorno = JSON.parse(response._body);
        this.showToast('mensagem enviada!');
      },
      (error: any) => {
        console.log(error);
        this.showToast('Erro no envio!');
      }
    );
    this.contactForm.reset();
  }


  showToast(msg:string){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
