import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { Autostart } from '@ionic-native/autostart';
import { TabsPage } from '../pages/tabs/tabs';
import { OptionsPage } from '../pages/options/options';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') content: NavController;

  // rootPage: any = HomePage;

  tabsPage: any = TabsPage;
  optionsPage: any = OptionsPage;


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
    });
  }

  onNavigate(page: any) {
    this.content.setRoot(page);
    this.menuCtrl.close();
    console.log('app component');
  }
}
