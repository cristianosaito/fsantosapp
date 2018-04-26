import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  contactForm: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      mensagem: [''],
    });
  }

  sendContactForm(){
    console.log(this.contactForm.value)

  }

}
