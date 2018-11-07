import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AppareilsService } from '../../../services/appareils.service';
import { Appareil } from '../../../models/Appareil';
import { NavController } from 'ionic-angular';
import { AppareilsPage } from '../appareils';

@Component({
  selector: 'page-appareil-from',
  templateUrl: 'appareil-from.html',
})
export class AppareilFromPage implements OnInit{

  appareilForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private appareilsService: AppareilsService, private navCtrl: NavController) {
  }

  ngOnInit() {
    this.appareilForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: this.formBuilder.array([])
    })
  }

  getDescriptonArray() {
    return this.appareilForm.get('description') as FormArray;
  }

  private getName() {
    return this.appareilForm.get('name');
  }

  onAddDescription() {
    let newControl = this.formBuilder.control('', [Validators.required]);
    this.getDescriptonArray().controls.push(newControl);
  }

  onRemoveDescription(index: number) {
    this.getDescriptonArray().removeAt(index);
    console.log('Delete description');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppareilFromPage');
  }

  onSubmitForm() {
      if(this.appareilForm.valid) {
      
      let description: string[] = [];

      this.getDescriptonArray().controls.forEach(elem => {
       description.push(elem.value);
      });

      const newAppareil: Appareil = {name: this.getName().value, description: description, isOn: false, endTime: '', startTime: ''};
      
      this.appareilsService.addAppareil(newAppareil);

      this.navCtrl.push(AppareilsPage);
    }
  }

}
