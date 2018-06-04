import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { FirstPage } from '../first/first'; 
import { PerfilPage } from '../perfil/perfil';
import { CotacaoPage } from "../cotacao/cotacao";
import { SearchPage } from '../search/search';
import { IntroPage } from '../intro/intro';
import { AlertController, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FirstPage;
  tab2Root = CotacaoPage;
  tab3Root = HomePage;
  tab4Root = SearchPage;
  tab5Root = PerfilPage;

  constructor(
    private ofAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    ) {

  }

  ionViewWillLoad() {
    this.ofAuth.authState.subscribe(
      data =>
        {
          if (!data && !data.email && !data.uid) {
            this.navCtrl.setRoot(IntroPage);

          }
        }
    );
  }

 
}
