import { Component } from '@angular/core';
import { SettingsPage } from '../settings/settings';
import { AppareilsPage } from '../appareils/appareils';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  appareilsPage = AppareilsPage;
  settingsPage = SettingsPage;

}
