import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AboutPage } from '../pages/about/about';
import { CotacaoPage } from '../pages/cotacao/cotacao';
import { ContactPage } from '../pages/contact/contact';
import { IntroPage } from '../pages/intro/intro';
import { PerfilPage } from '../pages/perfil/perfil';
import { FirstPage } from '../pages/first/first'
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
import { ResultPage } from '../pages/result/result';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { FaqPage } from '../pages/faq/faq';
import { PoliticaPage } from '../pages/politica/politica';
import { HistoricoPage } from '../pages/historico/historico';
import { ProfilePage } from '../pages/profile/profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NcmProvider } from '../providers/ncm/ncm';
import { CalculoProvider } from '../providers/calculo/calculo';
import { firebaseConfig} from '../config/firebaseConfig';
import { AngularFireDatabaseModule } from "angularfire2/database";


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    CotacaoPage,
    HomePage,
    TabsPage,
    SearchPage,
    ResultPage,
    LoginPage,
    RegisterPage,
    ContactPage,
    IntroPage,
    PerfilPage,
    FirstPage,
    FaqPage,
    PoliticaPage,
    HistoricoPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    CotacaoPage,
    HomePage,
    TabsPage,
    SearchPage,
    ResultPage,
    LoginPage,
    RegisterPage,
    ContactPage,
    IntroPage,
    PerfilPage,
    FirstPage,
    FaqPage,
    PoliticaPage,
    HistoricoPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NcmProvider,
    CalculoProvider
  ]
})
export class AppModule {}
