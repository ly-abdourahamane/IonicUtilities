import { Component } from '@angular/core';
import { IonicPage, ModalController, MenuController, NavController } from 'ionic-angular';
import { SingleAppareilPage } from './single-appareil/single-appareil';
import { AppareilsService } from '../../services/appareils.service';
import { Appareil } from '../../models/Appareil';
import { AppareilFromPage } from './appareil-from/appareil-from';

@IonicPage()
@Component({
  selector: 'page-appareils',
  templateUrl: 'appareils.html',
})
export class AppareilsPage { 
  
  appareilsList: Appareil[];

  constructor(private modalCtrl: ModalController, 
    private appareilsService: AppareilsService,
     private menuCtrl: MenuController,
     private navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppareilsPage');
  }

  ionViewWillEnter() {
    this.appareilsList = this.appareilsService.appareilsList.slice();
  }

  onLoadAppareil(index: number): void {
    let modal = this.modalCtrl.create(SingleAppareilPage,  {index: index});
    modal.present();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  onNewAppareil(): void {
    this.navCtrl.push(AppareilFromPage);
  }
}
