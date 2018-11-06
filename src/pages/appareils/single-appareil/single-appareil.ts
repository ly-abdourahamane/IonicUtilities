import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Appareil } from '../../../models/Appareil';
import { AppareilsService } from '../../../services/appareils.service';

@Component({
  selector: 'page-single-appareil',
  templateUrl: 'single-appareil.html',
})
export class SingleAppareilPage implements OnInit{

  appareil: Appareil;
  index: number;

  constructor(public navParams: NavParams, public viewCtrl: ViewController, public appareilsService: AppareilsService) {
  }

  ngOnInit(): void {
    this.index = this.navParams.get('index');
    this.appareil = this.appareilsService.appareilsList[this.index];
  }

  dismissModal() {
    console.log("close modal");
    this.viewCtrl.dismiss();
  }

  onToggleAppareil() {
    this.appareil.isOn = !this.appareil.isOn;
    console.log("single appareil");
  }
}
