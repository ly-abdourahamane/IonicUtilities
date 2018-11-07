import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { Autostart } from '@ionic-native/autostart';
import { TabsPage } from '../pages/tabs/tabs';
import { OptionsPage } from '../pages/options/options';

import * as firebase from 'firebase';
import { AuthPage } from '../pages/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') content: NavController;

  // rootPage: any = HomePage;

  tabsPage: any = TabsPage;
  optionsPage: any = OptionsPage;
  authPage: any = AuthPage;

  isAuth: boolean = false;


  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
     public statusBar: StatusBar,
     public splashScreen: SplashScreen,
     private menuCtrl: MenuController,
     private autostart: Autostart) {
   
    this.autostart.enable();

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //FIREBASE CONFIGURATION
      let config = {
        apiKey: "AIzaSyD46-txGocvQoBQAG8130azE9_xrnTcdpg",
        authDomain: "gestionappareils-ionic.firebaseapp.com",
        databaseURL: "https://gestionappareils-ionic.firebaseio.com",
        projectId: "gestionappareils-ionic",
        storageBucket: "gestionappareils-ionic.appspot.com",
        messagingSenderId: "1087183596579"
      };
      firebase.initializeApp(config);

      firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.isAuth = true;
            this.content.setRoot(TabsPage);
          } else {
            this.isAuth = false;
            this.content.setRoot(AuthPage, {mode: 'connect'});
          }
        });
console.log(this.isAuth);
    });
  }

  onDisconnect() {
    firebase.auth().signOut();
    this.menuCtrl.close();
    console.log('user disconnected');
  }

  onNavigate(page: any, data?: {}) {

    this.content.setRoot(page, data ? data : null);
    this.menuCtrl.close();
    console.log('app component', data);
  }
}
