import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppareilsPage } from '../pages/appareils/appareils';
import { Autostart } from '@ionic-native/autostart';
import { SingleAppareilPage } from '../pages/appareils/single-appareil/single-appareil';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { AppareilsService } from '../services/appareils.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AppareilsPage,
    SingleAppareilPage,
    SettingsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AppareilsPage,
    SingleAppareilPage,
    SettingsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    Autostart,
    SplashScreen,
    AppareilsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}