import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Page3 } from '../pages/page3/page3';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/signup/signup';
import { SettingsPage } from '../pages/settings/settings';
import { RedditsPage } from '../pages/reddits/reddits';

import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../providers/auth-service';


export const firebaseConfig = {
  apiKey: "AIzaSyAi2xZtIbJPJKpmkVmKViWjJaKaYchcRHA",
    authDomain: "donationbox-35229.firebaseapp.com",
    databaseURL: "https://donationbox-35229.firebaseio.com",
    storageBucket: "donationbox-35229.appspot.com",
    messagingSenderId: "939840354543"
};

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    Page3,
    LoginPage,
    SignUpPage,
    SettingsPage,
    RedditsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    Page3,
    LoginPage,
    SignUpPage,
    SettingsPage,
    RedditsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},AuthService]
})
export class AppModule {}
