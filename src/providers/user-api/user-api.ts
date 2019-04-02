import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { EventJo } from '../../models/eventJo';
import { Header } from 'ionic-angular';
import {BaseRequestOptions, RequestOptions, RequestOptionsArgs} from "@angular/http";
import { stringify } from '@angular/compiler/src/util';

@Injectable()
export class UserApiProvider {

  private _user: User;
  private _status: Number = 0;

  constructor(public http: HttpClient) {
    console.log('Hello UserApiProvider Provider');
  }

  getUser():User {
    return this._user;
  }

  setUser(value: User) {
    this._user = value;
  }

  // checkEmail(email: string):Observable<any> {
  //   return this.http.get("http://localhost:8080/api/check/" + email);
  // }

  // Register
  userRegister(user: User):Observable<any> {
    return this.http.post(
      "http://localhost:8080/api/users", 
      JSON.stringify(user), 
      {headers: { 'Content-Type': 'application/json' }
    });
  }

  // Login
  userLogin(postParams:any):Observable<any> {
    return this.http.post(
      "http://localhost:8080/api/login", 
      // JSON.stringify({ email: 'toto@gmail.com', password: "totototo" }), 
      JSON.stringify(postParams), 
      {headers: { 'Content-Type': 'application/json' }
    });
  }

  // Login
  userLogin2(postParams:any):Observable<any> {
    return this.http.post(
      "http://localhost:8080/api/login", 
      // JSON.stringify({ email: 'toto@gmail.com', password: "totototo" }), 
      {headers: { 'Content-Type': 'application/json' }
    });
  }

  // Nodejs + MySql
  login(postParams:any):Observable<any> {
    return this.http.post(
      "http://localhost:8080/login", 
      JSON.stringify(postParams), 
      {headers: { 'Content-Type': 'application/json' }
    });
  }

  register(user: User):Observable<any> {
    return this.http.post(
      "http://localhost:8080/users", 
      JSON.stringify(user), 
      {headers: { 'Content-Type': 'application/json' }
    });
  }
  // Fin Nodejs + MySql

  // Utilisation de l'API PHP
  // End API PHP

  getAllUsers():Observable<any>{
    return new Observable( observer => {
      this.http.get("http://localhost:8080/api/users").toPromise().then(
        (reponse:any) => {
          // console.log("Provider");
          // console.log(reponse);
          // Traitement avant l'envoi des données
          let aUsers:User[] = new Array;
          if (reponse.httpCode === 200) {
            for (let i=0;i<reponse.users.length;i++) {
              var user = new User();
              user.firstname = reponse.users[i].firstname;
              user.lastname = reponse.users[i].lastname;
              user.email = reponse.users[i].email;
              user.password = reponse.users[i].password;
              user.avatar = reponse.users[i].avatar;
              user.createdAt = reponse.users[i].createdAt;
              user.updatedAt = reponse.users[i].updatedAt;
              if (reponse.users[i].status === 1) aUsers.push(user);
            }
          }
          // Transmet les datas
          observer.next(aUsers)
        }
      ).catch(err => {
        console.error(err);
      })
    })
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
              event.latitude = reponse.events[i].latitude;
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
