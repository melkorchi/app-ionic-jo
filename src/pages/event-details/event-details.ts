import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { EventJo } from '../../models/eventJo';
import leaflet from 'leaflet';
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
import { EventApiProvider } from '../../providers/event-api/event-api';
import { HttpProvider } from '../../providers/http/http';

@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {

  public event: EventJo;
  // map: GoogleMap;
  // leaflet
  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps, private platform: Platform, public eventApiProvider: EventApiProvider, public httpProvider: HttpProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailsPage');
    this.event = this.navParams.data;
    console.log(this.event);
    
    // test récupération des évènements autres que sportifs
    // this.eventApiProvider.getOtherEvents().subscribe(
    //   (data) => {
    //     console.log(data.records);
    //     this.loadOpenStreetMapV2(data.records);
    //   },
    //   (err) => {
    //     console.error(err);
    //   }
    // );

    // Idem avec fichier json
    this.httpProvider.get('eventOpenDataBase.json').subscribe(
      (eventsOpenDataBase) => {
        console.log(eventsOpenDataBase['records']);
        this.loadOpenStreetMap(eventsOpenDataBase['records']);
      },
      (err) => {
        console.log(err);
      });

  }

  // Get Icon
  getIcon(color) {
    if (color == 'red') {
      var urlIcon = "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png";
    } 
    if (color == 'green') {
      var urlIcon = "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png";
    } 

    var icon = new leaflet.Icon({
      iconUrl: urlIcon,
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })

    return icon;
  }

  // Get Marker
  getMarker(lat, lon, description, freeText, icon) {
    let marker: any = leaflet
    .marker([lat, lon],{
      icon: icon
    })
    .on('dblclick', () => {
      // On  redirige vers la page détail de l'event
      alert('Marker double clicked');
    })
    .bindTooltip(description, {
      direction: 'center'
    })
    .openTooltip()
    .bindPopup(freeText)
    .openPopup();

    return marker;
  }

  loadOpenStreetMap(otherEvents) {
    // Multiple markers
    // this.map = leaflet.map("map_generale").fitWorld();
    this.map = leaflet.map("map", {
      center: [48.8534, 2.3488],
      zoom: 9
    });
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      zoom: 10,
      maxZoom: 28
    }).addTo(this.map);

    let markerGroup = leaflet.featureGroup();
    
    var redIcon = this.getIcon('red');
    var greenIcon = this.getIcon('green');

    let date = new Date(this.event.eventDate);
    let hour = date.getHours();
    let min = date.getMinutes();
    if (min > 0) {
      var heure = hour +'H'+ min;
    } else {
      var heure = hour +'H';
    }

    var listePays = "Pays représentés: ";
      this.event.pays.forEach(element => {
        listePays += element +',';
      });
      listePays = listePays.substring(0,listePays.length-1);
    
    let marqueur = this.getMarker(this.event.latitude, this.event.longitude, heure + ':' +this.event.categorie+', '+this.event.epreuve+', '+this.event.nomDuSite ,heure + ':' +this.event.categorie+', '+this.event.epreuve+', '+this.event.nomDuSite+'.<br>'+ listePays, redIcon);

    markerGroup.addLayer(marqueur);

    // On ajoute les évènements parisien non sportifs
    let _self = this;
    otherEvents.forEach(function(event) {

      let marqueur = _self.getMarker(event.fields.latlon[0], event.fields.latlon[1],event.fields.description,event.fields.free_text, greenIcon);

      markerGroup.addLayer(marqueur);

    })

    this.map.addLayer(markerGroup);

  }


}
