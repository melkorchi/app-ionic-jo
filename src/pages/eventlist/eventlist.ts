import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { EventJo } from '../../models/eventJo';
import { EventApiProvider } from '../../providers/event-api/event-api';
import { EventDetailsPage } from '../event-details/event-details';

@IonicPage()
@Component({
  selector: 'page-eventlist',
  templateUrl: 'eventlist.html',
})
export class EventlistPage {

  private events: EventJo[] = [];
  public icon: string = 'football';
  // public icon: Array<string> = [
  //   'football': 'football'
  // ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventApiProvider: EventApiProvider, public http: HttpClient) {
  }

  ionViewDidLoad() {
    this.eventApiProvider.getJoEvents().subscribe(
      (data) => {
        console.log('list', data);
        this.events = data.events;
      }, 
      (err) => {
        console.error(err);
      }
    )
  }

  goToDetail(event: EventJo) {
    this.navCtrl.push(EventDetailsPage, event);
  }


}
