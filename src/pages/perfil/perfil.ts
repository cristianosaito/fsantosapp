import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
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

@IonicPage()
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
  imagem: string ="assets/imgs/user.png";

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
    if (this.navParams.get('img')){
      this.imagem = this.navParams.get('img');
      this.saveImage();
    }else{
      this.loadImage();
    }
  }

  saveImage(){
    this.ofAuth.authState.take(1).subscribe(
      data => {
        this.imageSrv.uploadImage(this.imagem, data.uid);          
      });
  }

  loadImage(){
    let img_saved = localStorage.getItem('perfil_imagem');

    if (img_saved) {
      this.ofAuth.authState.take(1).subscribe(
        data => {
          this.imagem = this.imageSrv.getImage(data.uid, img_saved);
        });
    }
    
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
        });
      }
    )
  }

 
}
