import { Component } from '@angular/core';
import { LoginPage } from '../login/login';
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { CotacaoPage } from "../cotacao/cotacao";
import { SearchPage } from '../search/search';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = CotacaoPage;
  tab4Root = SearchPage;

  constructor(
    private toastCtrl: ToastController,
    private ofAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController
    ) {

  }

  ionViewWillLoad() {
    this.ofAuth.authState.subscribe(
      data =>
        {
          if (!data && !data.email && !data.uid) {
            this.navCtrl.setRoot(LoginPage);

          }
        }
    );
  }

  confirmLogout(){
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

  logOut(){
    this.ofAuth.auth.signOut();
    let toast = this.toastCtrl.create({ duration: 3000, position: 'top' });
    toast.setMessage('Logout efetuado com sucesso');
    toast.present();
    this.navCtrl.setRoot(LoginPage);

  }
}
