import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { User } from '../../models/user';
import { EventJo } from '../../models/eventJo';
// import { Header } from 'ionic-angular';
import {BaseRequestOptions, RequestOptions, RequestOptionsArgs} from "@angular/http";
import { stringify } from '@angular/compiler/src/util';

// MongoDB
// let apiUrl = "http://localhost:8080/api/eventsJo";

// MySql
let apiUrl = "http://localhost:8080/events";

// OpenDataSoft
let apiOtherEventsUrl = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-cibul&facet=tags&facet=placename&facet=department&facet=region&facet=city&facet=date_start&facet=date_end&facet=pricing_info&facet=updated_at&facet=city_district&refine.department=Paris&refine.date_start=2018%2F12%2F11&refine.date_end=2018%2F12%2F11";

@Injectable()
export class EventApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello EventApiProvider Provider');
  }

  // New method with token use
  getJoEvents():Observable<any>{
    const data = JSON.parse(localStorage.getItem('userData'));
    return this.http.get(
      apiUrl,
      {headers: { 'Content-Type': 'application/json', 'x-access-token': data.token }}
    );
  }

  // Permet de récupérer les événements autres que sportifs
  getOtherEvents():Observable<any>{
    return this.http.get(
      apiOtherEventsUrl,
      {headers: { 'Content-Type': 'application/json' }}
    );
  }

  getAllEvents():Observable<any>{
    return new Observable( observer => {
      this.http.get("http://localhost:8080/api/eventsJo").toPromise().then(
        (reponse:any) => {
          // Traitement avant l'envoi des données
          let aEvents:EventJo[] = new Array;
          console.log(reponse)
          if (reponse.httpCode === 200) {
            for (let i=0;i<reponse.events.length;i++) {
              var event = new EventJo();
              event.categorie = reponse.events[i].categorie;
              event.epreuve = reponse.events[i].epreuve;
              event.nomDuSite = reponse.events[i].nomDuSite;
              event.commune = reponse.events[i].commune;
              // event.latitude = reponse.events[i].latitude;
              event.lattitude = reponse.events[i].latitude;
              event.longitude = reponse.events[i].longitude;
              event.eventDate = reponse.events[i].eventDate;
              event.createdAt = reponse.events[i].createdAt;
              event.updatedAt = reponse.events[i].updatedAt;
              aEvents.push(event);
            }
          }
          // Transmet les datas
          observer.next(aEvents)
        }
      ).catch(err => {
        console.error(err);
      })
    })
  }


}
