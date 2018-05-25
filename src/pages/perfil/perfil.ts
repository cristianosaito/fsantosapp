import { Component } from '@angular/core';
import { App, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { IntroPage } from '../intro/intro';
import { AboutPage } from "../about/about";
import { ContactPage } from "../contact/contact";
import { FaqPage } from '../faq/faq';
import { PoliticaPage } from '../politica/politica';
import { HistoricoPage } from '../historico/historico';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Profile } from "../../models/profile";
import { EditPerfilPage } from "../edit-perfil/edit-perfil";
import { ImageProvider } from '../../providers/image/image';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
    providers: [
      ImageProvider
    ]
})
export class PerfilPage {

  profileData: AngularFireObject <Profile>;
  nome: string;
  cpf: string;
  email:string;
  imagem: any;
  user_id:any;

  constructor(
    private afDatabase: AngularFireDatabase,
    private toastCtrl: ToastController,
    private ofAuth: AngularFireAuth,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private app: App,
    private imageSrv: ImageProvider
) {
    this.loadImage();

  }

  loadImage(){
    this.ofAuth.authState.take(1).subscribe(
      data => {
        let promiseList = [];
        
          let promise = this.imageSrv.getImage(data.uid);
          promiseList.push(promise);
        
        Promise.all(promiseList)
          .then(url => {
            this.imagem = url;
          
          });
      });
  }
   
  goEditPerfilPage() {
    this.navCtrl.push(EditPerfilPage, { img: this.imagem });
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
    
    this.ofAuth.authState.take(1).subscribe(
      data =>{
        this.profileData = this.afDatabase.object(`profile/${data.uid}`);
        this.profileData.valueChanges().subscribe(profile=>{
          this.nome = profile.nome;
          this.cpf = profile.cpf;
          this.email = profile.email;
        });
      }
    )
  }

 
}
