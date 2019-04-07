import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventApiProvider } from '../../providers/event-api/event-api';
import { HttpProvider } from '../../providers/http/http';

@IonicPage()
@Component({
  selector: 'page-creer-son-itineraire',
  templateUrl: 'creer-son-itineraire.html',
})
export class CreerSonItinerairePage {

  public sportEvents;
  public openDataBaseEvents;
  public storedEvents:Array<any> = [];
  public yetStoredEvents:Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventApiProvider: EventApiProvider, public httpProvider: HttpProvider) {
    if (localStorage.getItem('selectedEvents')) {
      this.yetStoredEvents = JSON.parse(localStorage.getItem('selectedEvents'));
    }
  }

  // ionViewDidLoad() {
  ionViewDidEnter() {
    console.log('ionViewDidLoad CreerSonItinerairePage');
    // Récup des events sportifs
    this.eventApiProvider.getJoEvents().subscribe(
      (data) => {
        console.log(data.events);
        this.sportEvents = data.events;

        this.sportEvents.forEach(element => {
        element.hour = this.getDate(element.eventDate);

        });

      },
      (err) => {
        console.log(err);
      });
    
    // Récup des events openDataBaseEvents
    this.httpProvider.get('eventOpenDataBase.json').subscribe(
      (data) => {
        this.openDataBaseEvents = data['records'];

        let _self = this;
        this.openDataBaseEvents.forEach(function(event) {
          let dates = event.fields.timetable.split(' ');
          event.hourDeb = _self.getDate(dates[0]);
          event.hourFin = _self.getDate(dates[1]);
        })
      },
      (err) => {
        console.log(err);
      });
  }

   // Récupérer les heures
   getDate(strDate) {
    let date = new Date(strDate);
    let hour = date.getHours();
    let min = date.getMinutes();
    if (min > 0) {
      var heure = hour +'H'+ min;
    } else {
      var heure = hour +'H';
    }

    return heure;
  }

  // Ajouter event à l'itinéraire
  addEvent(event) {
    console.log('ADD EVENT');
    console.log(event);

    let obj = {};
    if (event.hasOwnProperty('categorie')) {
      obj = {
        title: event.categorie,
        theme: event.epreuve,
        lieu: event.nomDuSite + ' ' + event.commune,
        hour: event.hour
      }
    } else {
      obj = {
        title: event.fields.title,
        theme: 'open datasoft event',
        lieu: event.fields.address,
        hour: event.hourDeb + '-' +event.hourFin
      }
    }

    this.storedEvents.push(obj);

  }

  deleteEvent(event) {
    let theIndex = -1;
    this.storedEvents.forEach(function(element, index) {
      if (element.title == event.title && element.theme == event.theme && element.lieu == event.lieu) {
        theIndex = index;
        return;
      }
    });
    if (theIndex > -1) this.storedEvents.splice(theIndex,1);
  }

  // Valider la sélection
  validate() {
    localStorage.setItem('selectedEvents', JSON.stringify(this.storedEvents));
    
    this.yetStoredEvents = this.storedEvents;
    this.storedEvents = [];
  }


}
