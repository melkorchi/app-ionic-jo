import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, MenuController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { EventJo } from '../../models/eventJo';
import { EventApiProvider } from '../../providers/event-api/event-api';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';


import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  LatLng
} from '@ionic-native/google-maps';
import leaflet from 'leaflet';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map_generale') mapContainer: ElementRef;
  map: any;

  private events: EventJo[] = [];
  public userDetails: any;
  // map: GoogleMap;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private geolocation: Geolocation, public eventApiProvider: EventApiProvider, private googleMaps: GoogleMaps, public http: HttpClient, public menuCtrl: MenuController, private nativeGeocoder: NativeGeocoder) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.users;
    // console.log('userDetails', this.userDetails);
    this.menuCtrl.enable(true);
  }

  ionViewDidEnter() {
    // Règle le problème du already initialized...
    // ionViewDidLoad() {
    this.eventApiProvider.getJoEvents().subscribe(
      (data) => {
        console.log('Map Générale');
        this.events = data.events;
        // this.events = data;
        console.log('events', this.events);
        // Utilisation de OpenStreetMap
        this.loadOpenStreetMap();
      }, 
      (err) => {
        // console.error(err);
        console.log(err);
      }
    )
  }

  loadOpenStreetMap() {
    // Multiple markers
    // this.map = leaflet.map("map_generale").fitWorld();
    this.map = leaflet.map("map_generale", {
      center: [48.8534, 2.3488],
      zoom: 9
    });
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 28
    }).addTo(this.map);

    let markerGroup = leaflet.featureGroup();

    var greenIcon = new leaflet.Icon({
      iconUrl:
        // "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // this.events.forEach(function(event){
    this.events.forEach(function(event){
      console.log(event);
      // console.log(event.ID_EVENT);
      let date = new Date(event.eventDate);
      // let date = new Date(event.EVENT_DATE);
      let hour = date.getHours();
      let min = date.getMinutes();
      if (min > 0) {
        var heure = hour +'H'+ min;
      } else {
        var heure = hour +'H';
      }
      // console.log(hour + ' ' + min);
      
      var listePays = "Pays représentés: ";
      // event.pays.forEach(element => {
      event.participants.forEach(element => {
        listePays += element +',';
      });
      listePays = listePays.substring(0,listePays.length-1);
      

      let marker: any = leaflet
        .marker([event.lattitude, event.longitude],{
        // .marker([event.LATTITUDE, event.LONGITUDE],{
         icon: greenIcon
        })
        .on('dblclick', () => {
          // On  redirige vers la page détail de l'event
          alert('Marker double clicked');
        })
        // .bindTooltip(heure + ':' +event.categorie+', '+event.epreuve+', '+event.nomDuSite, {
        .bindTooltip(heure + ':' +event.discipline+', '+event.epreuve+', '+event.site+ ', ' +event.commune, {
          direction: 'center'
        })
        .openTooltip()
        // .bindPopup(heure + ':' +event.categorie+', '+event.epreuve+', '+event.nomDuSite+'.<br>'+ listePays)
        .bindPopup(heure + ':' +event.discipline+', '+event.epreuve+', '+event.site+ ', ' +event.commune+'.<br>'+ listePays)
        .openPopup();

      markerGroup.addLayer(marker);

    });
    // End foreach

    this.map.addLayer(markerGroup);
  }

}
