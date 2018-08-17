import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Page3 } from '../pages/page3/page3';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/signup/signup';
import { SettingsPage } from '../pages/settings/settings';
import { RedditsPage } from '../pages/reddits/reddits';
import {RedditService} from './services/reddit.services';

import { AngularFire } from 'angularfire2';

// ,FirebaseListObservable, FirebaseObjectObservable
@Component({
  templateUrl: 'app.html',
  providers:[RedditService],
//   template: `
//   <ul>
//     <li *ngFor="let item of items | async">
//        {{ item | json }}
//     </li>
//   </ul>
//   `,
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = Page1;

  pages: Array<{title: string, component: any}>;
// items: FirebaseListObservable<any>;
  constructor(public platform: Platform,af: AngularFire) {
    
    this.initializeApp();
    // this.items = af.database.list('/items');

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Item Listing', component: Page1 },
      { title: 'Add new Item', component: Page2 },
      // { title: 'Password Reset', component: Page3 },
      { title: 'Login', component: LoginPage },
      { title: 'Sign Up', component: SignUpPage },
      { title: 'Details of Developers', component: SettingsPage },
      // { title: 'RedditPage', component: RedditsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
