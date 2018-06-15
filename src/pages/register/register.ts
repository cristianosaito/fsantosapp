import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import { Usuario } from '../../models/user';
import { Profile } from "../../models/profile";
import { LoginPage } from "../login/login";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from "angularfire2/database";
//import { TabsPage } from '../tabs/tabs';
import { PoliticaPage } from '../politica/politica';
import { ValidaCpfProvider } from "../../providers/valida-cpf/valida-cpf";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [
    ValidaCpfProvider
  ]
})
export class RegisterPage {

  user = {} as Usuario;
  profile = {} as Profile;
  termos:boolean = false;
  cpf_ok:boolean = false;
  email_ok:boolean = false;
  senha_ok: boolean = false;
  nome_ok: boolean = false;

  @ViewChild('cpfInput') cpfInput;
  @ViewChild('emailInput') emailInput;
  @ViewChild('foneInput') foneInput;

  constructor(
    private ofAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    public validaCpf: ValidaCpfProvider,
    private toastCtrl: ToastController
  ) {
  }

  async register(user: Usuario) {
      this.ofAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(data =>{
        console.log(data);
        this.enviaEmailVerificação();
        this.createProfile();
      })
      .catch(error=>{
        console.log(error);
        if (error = "auth/email-already-in-use") {
          let toast = this.toastCtrl.create({ duration: 3000, position: 'top' });
          toast.setMessage('E-mail já cadastrado!');
          toast.present();
        }
      });
  }

  createProfile() {
    this.ofAuth.authState.take(1).subscribe(
      auth => {
        this.profile.email = auth.email;
        console.log(auth.email);
        this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
          .then(() => this.navCtrl.setRoot(LoginPage))
      }
    )
  }

  enviaEmailVerificação() {
    let toast = this.toastCtrl.create({ duration: 3000, position: 'top' });
    var user = this.ofAuth.auth.currentUser;
    user.sendEmailVerification().then(function () {
      toast.setMessage('E-mail de verificação enviado!');
      toast.present();
    }).catch(function (error) {
      // An error happened.
      console.log(error);
    });
  }

  mascara_cpf_cnpj(){
    var dig = this.profile.cpf;

    if(dig){
      if (dig.length == 11) {
        dig.split("");
        let cpf_formatado = dig[0] + dig[1] + dig[2] + '.' + dig[3] + dig[4] + dig[5] + '.' + dig[6] + dig[7] + dig[8] + '-' + dig[9] + dig[10];
        let validou = this.validaCpf.validaCPF(this.profile.cpf);
        this.profile.cpf = cpf_formatado;

        if (!validou) {
          this.presentToast('CPF inválido');
          this.profile.cpf = '';
          this.cpfInput.setFocus();
        } else if (validou) {
          this.cpf_ok = true;
        }
      } else if (dig.length == 14) {
        dig.split("");
        let cnpj_formatado = dig[0] + dig[1] + '.' + dig[2] + dig[3] + dig[4] + '.' + dig[5] + dig[6] + dig[7] + '/' + dig[8] + dig[9] + dig[10] + dig[11] + '-' + dig[12] + dig[13];
        this.profile.cpf = cnpj_formatado;
        let validou = this.validaCpf.validaCNPJ(this.profile.cpf);

        if (!validou) {
          this.presentToast('CNPJ inválido');
          this.profile.cpf = '';
          this.cpfInput.setFocus();
        }else if(validou){
          this.cpf_ok = true;
        }
      } else {
        this.presentToast('Favor verificar o CPF/CNPJ');
      }
    }
  }

  mascara_phone() {
    var dig = this.profile.telefone;

    if (dig) {
      if (dig.length == 11){
        dig.split("");
        let fone_formatado = '(' + dig[0] + dig[1] + ')' + dig[2] + dig[3] + dig[4] + dig[5] + dig[6] + '-' + dig[7] + dig[8] + dig[9] + dig[10];
        this.profile.telefone = fone_formatado;
       
      } else if (dig.length == 10) {
        dig.split("");
        let fone_formatado = '(' + dig[0] + dig[1] + ')' + dig[2] + dig[3] + dig[4] + dig[5] + '-' + dig[6] + dig[7] + dig[8] + dig[9];
        this.profile.telefone = fone_formatado;
       
      } else if (dig.length != 14 && dig.length != 13){
        this.presentToast('Informar o telefone com o DDD');
      }
    }
  }


  presentToast(msg:string) {
    let toast = this.toastCtrl.create({
      message:msg ,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  onlyNumber(event: any){
    if (this.cpfInput.value) {
      const pattern = /[^0-9]/g;
      var str = this.profile.cpf;
      var result = str.replace(pattern, '');
      this.cpfInput.value = result;
    }
  }

  onlyNumberFone(event: any) {
    if (this.foneInput.value) {
      const pattern = /[^0-9]/g;
      var str = this.profile.telefone;
      var result = str.replace(pattern, '');
      this.foneInput.value = result;
    }
  }

  valida_email(){
    var str = this.user.email;
    const pattern = '@';
    const pattern2 = '.co';
   
    if(str){
      var validou = str.match(pattern);
      var validou2 = str.match(pattern2);
      if (!validou || !validou2) {
        this.presentToast('e-mail inválido');
      } else if (validou && validou2){
        this.email_ok = true;
      }
    }
  }    

 valida_senha(){
    let senha = this.user.password;
    if (senha) {
      if (senha.length > 5) {
        this.senha_ok = true;
      }
    }
  }

  valida_nome() {
    let nome = this.profile.nome;
    if (nome) {
      if (nome.length > 5) {
        this.nome_ok = true;
      }
    }    
  }

  goLoginPage(){
    this.navCtrl.push(LoginPage);
  }

  goTermoPage(){
    this.navCtrl.push(PoliticaPage);
  }
}
