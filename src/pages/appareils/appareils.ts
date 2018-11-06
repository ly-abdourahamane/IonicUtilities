import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { SingleAppareilPage } from './single-appareil/single-appareil';
import { AppareilsService } from '../../services/appareils.service';
import { Appareil } from '../../models/Appareil';

@IonicPage()
@Component({
  selector: 'page-appareils',
  templateUrl: 'appareils.html',
})
export class AppareilsPage { 
  
  appareilsList: Appareil[];

  constructor(private modalCtrl: ModalController, private appareilsService: AppareilsService) {
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

  
}
