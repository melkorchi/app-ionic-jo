import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';

@IonicPage()
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
})
export class RankingPage {

  public rankingDatas: any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpProvider: HttpProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RankingPage');
    this.httpProvider.get('ranking.json').subscribe(
      (data) => {
        console.log(data);
        this.rankingDatas = data['records'];
      },
      (err) => {
        console.log(err);
    });
  }

}
