import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Usuario } from '../../models/user';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';
import { RecuperaSenhaPage } from '../recupera-senha/recupera-senha';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario = {} as Usuario;

  constructor(
    private toastCtrl: ToastController,
    private ofAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  async login(usuario: Usuario) {

     let toast = this.toastCtrl.create({duration:3000, position:'top'});
  
      this.ofAuth.auth.signInWithEmailAndPassword(usuario.email, usuario.password)
      .then(data => {
        if (this.verifyUserIsVerified()) {
          toast.setMessage('Usuário logado com sucesso');
          toast.present();
          this.navCtrl.setRoot(TabsPage);
        }else{
          toast.setMessage('Usuário não verificado. Novo E-mail enviado!');
          toast.present();
          this.enviaEmailVerificação();
          this.logOut();
        }
      })
      .catch(error => {
        console.log(error);
        toast.setMessage('Erro no login. Confira os seus dados!');
        toast.present();
      });
  }

  verifyUserIsVerified(){
    var user = this.ofAuth.auth.currentUser;
    var emailVerified = user.emailVerified;
    if (emailVerified) {
      return true;
    }else{
      return false;
    }
  }

  enviaEmailVerificação(){
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

  logOut() {
    this.ofAuth.auth.signOut();
    localStorage.removeItem("currentUser");
  }
         
  goRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

  goRecuperaSenhaPage() {
    this.navCtrl.push(RecuperaSenhaPage);
  }

  goEsqueceuSenha(){
    this.navCtrl.push(RecuperaSenhaPage);
  }

  ionViewDidLoad() {
    var user = this.ofAuth.auth.currentUser;
    if (user) {
      this.logOut();  
    }
  }
}
