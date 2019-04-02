import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// Flux RSS 1
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { RssProvider } from '../../providers/rss/rss';


@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})

export class NewsPage {

  rssDataArray: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public rssProvider: RssProvider, private iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
    this.getRssData();
  }

  getRssData() {
    this.rssProvider.getRss().subscribe(
       (data) => {
        this.rssDataArray = data.items;
        console.log(data.items);
      }
    );
  }

  openUrl(entry){
    this.iab.create(entry.link,"_system");
  }

}
