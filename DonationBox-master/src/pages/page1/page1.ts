import { Component } from '@angular/core';
import { AngularFire,FirebaseListObservable} from 'angularfire2';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
// , FirebaseObjectObservable
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  public items:any=[];
  public uid:string;
  public images:any=[];
  loggedin;
  // item: FirebaseObjectObservable<any[]>;
  assets: FirebaseListObservable<any[]>;
  lists:FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public af:AngularFire) {
    this.af.auth.subscribe(auth => {
      if(auth){
        this.uid=auth.uid;
        this.loggedin = true;
      }else{
        this.loggedin = false;
      }
    });
    this.lists = af.database.list('/lists', {preserveSnapshot:true});
    this.assets = af.database.list('/assets',{preserveSnapshot:true});
    this.lists.subscribe((result:any)=>{
      this.items =[];
      for(var i=0; i<result.length; i++)
      {
        this.items[i]=result[i].val();
        this.items[i].key=result[i].key;
      }
      console.log(this.items)
    });
// this.assets.subscribe((result:any)=>{
//       this.images =[];
//       for(var i=0; i<result.length; i++)
//       {
//         this.images[i]=result[i].val();
//         // this.items[i].key=result[i].key;
//       }
//       console.log(this.images)
//     });
  }
  public login()
  {
    this.navCtrl.setRoot(LoginPage);
  }
  public logout()
  {
    this.af.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }
  public canRemove(item:any)
  {
    if(this.uid == item.createdBy)
      return true;
    else
    return false;
  }
  public removeItem(item)
  {
    if(this.uid == item.createdBy)
    {
      this.lists.remove(item.key);
    }
  }

}
