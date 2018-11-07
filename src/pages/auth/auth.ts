import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage implements OnInit {

  mode: string;
  authForm: FormGroup;
  errorMessage: any;
  connectionMode: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private authService: AuthService,
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');

    if(this.mode === 'new') {
      this.connectionMode = 'Nouvel utilisateur';
    } else if (this.mode === 'connect') {
      this.connectionMode = 'Connexion';
    }

    console.log(this.mode);
    this.initForm();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  initForm() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmitForm() {
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;

    if(this.mode === 'new') {
      this.authService.signUpUser(email, password).then(() => {
        this.navCtrl.setRoot(TabsPage);
      }, error => {
        this.errorMessage = error;
        console.log(error);
      })
    } else if(this.mode === 'connect') {
      this.authService.signInUser(email, password).then(() => {
        this.navCtrl.setRoot(TabsPage);
      }, error => {
          this.errorMessage = error;
          console.log(error);
      })
    }
  }

}
