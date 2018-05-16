import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { IntroPage } from '../intro/intro';
import { AboutPage } from "../about/about";
import { ContactPage } from "../contact/contact";
import { FaqPage } from '../faq/faq';
import { PoliticaPage } from '../politica/politica';
import { HistoricoPage } from '../historico/historico';
/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(
    private toastCtrl: ToastController,
    private ofAuth: AngularFireAuth,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private app: App
) {
  }

  goAboutPage() {
    this.navCtrl.push(AboutPage);
  }

  goFaqPage() {
    this.navCtrl.push(FaqPage);
  }

  goPoliticaPage() {
    this.navCtrl.push(PoliticaPage);
  }

  goHistoricoPage() {
    this.navCtrl.push(HistoricoPage);
  }

  goContactPage() {
    this.navCtrl.push(ContactPage);
  }

  confirmLogout() {
    let alert = this.alertCtrl.create({
      title: 'Logout',
      message: 'Deseja realmente sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Sair',
          handler: () => {
            this.logOut();
          }
        }
      ]
    });
    alert.present();
  }

  logOut() {
    this.ofAuth.auth.signOut();
    let toast = this.toastCtrl.create({ duration: 3000, position: 'top' });
    toast.setMessage('Logout efetuado com sucesso');
    toast.present();
    localStorage.removeItem("currentUser");
    this.app.getRootNav().setRoot(IntroPage);
    this.navCtrl.setRoot(IntroPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}
