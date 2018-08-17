import { Component } from '@angular/core';
import { LoginPage } from '../login/login';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AngularFire } from 'angularfire2';
import { AlertController } from 'ionic-angular';
import * as firebase from 'firebase';


@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html'
})
export class Page3 {
  public email:string='';
  constructor(public navCtrl: NavController,public af: AngularFire,private _auth: AuthService,public alertCtrl: AlertController) {
   
  }
  public submit()
{
  //this.navCtrl.setRoot(Page3);
  if(this.email=='')
  {
    this.showAlert('Fail!','Enter email');
  }
  else
  {
  var a = firebase.auth();
  a.sendPasswordResetEmail(this.email).then(
    (success)=>{
      this.showAlert('Success!','Email has been sent');
      this.navCtrl.setRoot(LoginPage);
  }).catch(
    (err:any)=>{
        this.showAlert(err.code,err.message);
    });

  }
  }
  showAlert(x,y) {
    let alert = this.alertCtrl.create({
      title: x,
      subTitle: y,
      buttons: ['OK']
    });
    alert.present();
  }
}