import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

  logoutClicked() {
    console.log("Logout");
    //this.authService.logout();
    // this.menuCtrl.close();
    // var nav = this.app.getRootNav();
    //nav.setRoot(LoginPage);
    localStorage.clear();
    setTimeout(() => this.backToWelcome(), 1000);
  }

  backToWelcome() {
    // const root = this.app.getRootNav();
    // root.popToRoot();
    // this.navCtrl.push(LoginPage);
    this.navCtrl.setRoot(LoginPage);
  }

}
