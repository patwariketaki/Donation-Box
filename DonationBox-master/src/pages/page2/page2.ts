import { Component } from '@angular/core';
import { AngularFire,FirebaseListObservable} from 'angularfire2';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {Camera} from "ionic-native";
import { AuthService } from '../../providers/auth-service';
import * as _ from 'loadash';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html',
  providers:[Camera]
})
export class Page2 {
  public own:string='';
  public details:string='';
  public name:string='';
  public mfg_date:string='';
  public exp_date:string='';
  public address:string='';
  public phone:string='';
  public email:string='';
  public uid:string='';
  //adding Camera
  public base64Image: string;
public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }
  
  selectedItem: any;
  
lists:FirebaseListObservable<any[]>;
loggedin;
  constructor(public navCtrl: NavController, public navParams: NavParams, public af:AngularFire,public camera: Camera,public alertCtrl: AlertController) {
        this.af.auth.subscribe(auth => 
        {
          if(auth){
            this.uid=auth.uid;
            this.loggedin = true;
          }else{
            this.loggedin = false;
          }
        });
        this.lists = af.database.list('/lists',{preserveSnapshot:true});
        //adding Camera
        //this.base64Image = "https://placehold.sssit/150x150";
  this.base64Image = "https://placehold.it/300x300";
  }
  add()
    {
      if(this.own==''||this.details==''||this.name==''||this.address==''||this.phone==''||this.email==''||this.exp_date==''||this.mfg_date=='')
    {
      this.showAlert('fail!','All fields must be filled'); 
    }
     else if(this.mfg_date>=this.exp_date)
      {
        this.showAlert('fail!','expiry date should not be less than manufacturing date'); 
    }
    if(this.own!="[a-zA-Z0-9]+")
     {this.showAlert('fail!','Invalid owner name'); }

      if(this.name!="[a-zA-Z0-9]+")
     {
       this.showAlert('fail!','Invalid medicine name'); }
      if(this.own!="[a-zA-Z0-9]+")
     {this.showAlert('fail!','Invalid address'); }
      if(this.own!="[0-9][0-9]+")
     {this.showAlert('fail!','Invalid mobile no'); }

      else{
        this.lists.push({
          'own':this.own,
          'details':this.details,
      'name':this.name,
      'mfg_date':this.mfg_date,
      'exp_date':this.exp_date,
      'addr':this.address,
      'picked_image': this.base64Image,
      contact:{
        'phone':this.phone,
        'email':this.email
      },
      createdBy:this.uid
    }).then(
      (res)=>{console.log(res)
      this.showAlert('Success!','Record inserted');},
      (err:any)=>{console.error(err)
    this.showAlert(err.code,err.message);  
    }
    );
     }}
showAlert(x,y) {
    let alert = this.alertCtrl.create({
      title: x,
      subTitle: y,
      buttons: ['OK']
    });
    alert.present();
  }
 
public logout()
  {
    this.af.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }
  public login()
  {
    this.navCtrl.push(LoginPage);
  }
  //adding camera
  public takePicture() {
        Camera.getPicture({
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: false
        }).then((imageData: string) => {
            if(imageData.indexOf("file")!=0)
              this.base64Image = "data:image/jpeg;base64," + imageData;

            // this.af.database.list('/assets').push({
            //   'createdBy':this.uid,
            //   'picked_image': this.base64Image
            // })
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });
  }  
}
