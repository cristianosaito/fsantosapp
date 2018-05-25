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
        toast.setMessage('Usuário logado com sucesso');
        toast.present();
        this.navCtrl.setRoot(TabsPage);
      })
      .catch(error => {
        console.log(error);
        toast.setMessage('Erro no login. Confira os seus dados!');
        toast.present();

      });
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

}
