import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { NewsPage } from '../pages/news/news';
import { RankingPage } from '../pages/ranking/ranking';
import { MessageriePage } from '../pages/messagerie/messagerie';
import { CreerSonItinerairePage } from '../pages/creer-son-itineraire/creer-son-itineraire';
import { EventlistPage } from '../pages/eventlist/eventlist';
import { EventDetailsPage } from '../pages/event-details/event-details';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EventApiProvider } from '../providers/event-api/event-api';
import { UserApiProvider } from '../providers/user-api/user-api';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMaps } from '@ionic-native/google-maps';
import { LogoutPage } from '../pages/logout/logout';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { RssProvider } from '../providers/rss/rss';
import { HttpModule } from '@angular/http';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { HttpProvider } from '../providers/http/http';







@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // ListPage,
    NewsPage,
    RankingPage,
    MessageriePage,
    CreerSonItinerairePage,
    EventlistPage,
    EventDetailsPage,
    LoginPage,
    LogoutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    // ListPage,
    NewsPage,
    RankingPage,
    MessageriePage,
    CreerSonItinerairePage,
    EventlistPage,
    EventDetailsPage,
    LoginPage,
    LogoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventApiProvider,
    UserApiProvider,
    GoogleMaps,
    InAppBrowser,
    RssProvider,
    NativeGeocoder,
    Geolocation,
    IonicErrorHandler,
    HttpProvider
    ]
})
export class AppModule {}
