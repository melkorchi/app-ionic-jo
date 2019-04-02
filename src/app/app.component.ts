import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';
import { NewsPage } from '../pages/news/news';
import { RankingPage } from '../pages/ranking/ranking';
import { MessageriePage } from '../pages/messagerie/messagerie';
import { CreerSonItinerairePage } from '../pages/creer-son-itineraire/creer-son-itineraire';
import { EventlistPage } from '../pages/eventlist/eventlist';
// import { EventDetailsPage } from '../pages/event-details/event-details';

import { EventApiProvider } from '../providers/event-api/event-api';
import { UserApiProvider } from '../providers/user-api/user-api';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // rootPage: any = HomePage;
  rootPage: any = LoginPage;

  pages: Array<{title: string, icon: string, component: any}>;

  constructor(public  app: App, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      // HomePage correspont à la page Map générale
      { title: 'Map Générale', icon:'map', component: HomePage },
      // { title: 'List', component: ListPage },
      { title: 'Liste des évènements', icon:'contacts', component: EventlistPage },
      { title: 'News', icon:'list-box', component: NewsPage },
      { title: 'JO Ranking', icon:'medal', component: RankingPage },
      { title: 'Messagerie', icon:'mail', component: MessageriePage },
      { title: 'Créer son itinéraire', icon:'navigate', component: CreerSonItinerairePage },
      // { title: 'Déconnexion', icon:'log-out', component: LogoutPage }
      { title: 'Déconnexion', icon:'log-out', component: null }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);

    if (page.component) {
      this.nav.setRoot(page.component);
    } else {
      // logout logic
      localStorage.clear();
      // redirect to home
      this.nav.setRoot(LoginPage);
    }
    // if (page.title == "Déconnexion") {
    //   console.log('logout');
    //   // var nav = this.app.getRootNav();
    //   this.nav.setRoot(LoginPage);
    // }
    // else {
    //   console.log('page_component: ', page.component)
    //   this.nav.setRoot(page.component);
    // }
  }
}
