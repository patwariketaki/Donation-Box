import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {RedditService} from '../../app/services/reddit.services';

/*
  Generated class for the Reddits page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reddits',
  templateUrl: 'reddits.html'
})
export class RedditsPage {
  items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private redditService:RedditService) {}
  ngOnInit(){
    this.getPosts('sports',5);
  }
  getPosts(category,limit){
    this.redditService.getPosts(category,limit).subscribe(response => {
      this.items=response.data.children;
      });
  }
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad RedittsPage');
  // }

}
