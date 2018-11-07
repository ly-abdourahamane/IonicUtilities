import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, ModalController, MenuController, NavController, LoadingController, ToastController } from 'ionic-angular';
import { SingleAppareilPage } from './single-appareil/single-appareil';
import { AppareilsService } from '../../services/appareils.service';
import { Appareil } from '../../models/Appareil';
import { AppareilFromPage } from './appareil-from/appareil-from';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-appareils',
  templateUrl: 'appareils.html',
})
export class AppareilsPage implements OnInit, OnDestroy { 
  
  appareilsList: Appareil[];

  appareilsSubscription: Subscription;

  constructor(private modalCtrl: ModalController, 
    private appareilsService: AppareilsService,
     private menuCtrl: MenuController,
     private navCtrl: NavController,
     private toastCtrl: ToastController,
     private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.appareilsSubscription = this.appareilsService.appareils$.subscribe((appareils: Appareil[]) => {
      this.appareilsList = appareils.slice();
    });
    this.appareilsService.emitAppareils();
  }

  ngOnDestroy() {
    this.appareilsSubscription.unsubscribe();
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

  onSaveList() {
    let loader = this.loadingCtrl.create({content: 'Sauvegarde en cours…'});
    loader.present();

    this.appareilsService.saveData().then(() => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Données sauvegardées !',
          duration: 3000,
          position: 'bottom'
        }).present();
      }, (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      });
  }

  onFetchList() {
    let loader = this.loadingCtrl.create({content: 'Récuperation en cours…'});
    loader.present();
    
    this.appareilsService.retrieveData().then(() => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Données récupérées !',
          duration: 3000,
          position: 'bottom'
        }).present();
      }, (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      });
  }
}
