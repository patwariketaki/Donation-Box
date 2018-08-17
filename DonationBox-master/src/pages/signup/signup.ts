import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire,AuthProviders, FirebaseListObservable } from 'angularfire2';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
/*
  Generated class for the Login2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignUpPage {
 public firstname:string=''; 
 public lastname:string='';
 public email:string='';
  public password:string='';
  userdata:FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController,public af: AngularFire, public navParams: NavParams,public alertCtrl: AlertController) {}

signUpWithEmail(): void {
  this.userdata = this.af.database.list('/userdata',{preserveSnapshot:true});
  console.log("EMail="+this.email+":Password="+this.password)
  this.af.auth.createUser({
    email:this.email ,
    password: this.password
  }).then(
    (res) => {
      console.log(res);
      
      this.userdata.push({
        'firstname':this.firstname,
        'lastname':this.lastname,
        'email':this.email
      }).then(
      (res)=>{
        this.showAlert('Success!','Account created');
      },(err:any)=>{
        this.showAlert(err.code,err.message);
      });
      // this.userdata = this.af.database.list('/userdata',{preserveSnapshot:true});
      this.navCtrl.setRoot(LoginPage)
    },
    (err:any) => {
      console.log(err)
      this.showAlert(err.code,err.message);
      }
  )
  .catch();
  }
  showAlert(x,y) {
    let alert = this.alertCtrl.create({
      title: x,
      subTitle: y,
      buttons: ['OK']
    });
    alert.present();
  }
  public login()
{
  this.navCtrl.setRoot(LoginPage);
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad Login2Page');
  }

}