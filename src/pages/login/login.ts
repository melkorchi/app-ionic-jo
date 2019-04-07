import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { User } from '../../models/user';
import { HomePage } from '../home/home';
// import { EventlistPage } from '../eventlist/eventlist';
import { UserApiProvider } from '../../providers/user-api/user-api';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // Propriétés de la classe
  // Error
  public strloginError: string = '';
  // Switch login/register
  private opt: string = 'signin';
  private isEmailValid: boolean = false;

  public account = {
    username: 'melkorchi',
    fullname: 'El korchi Mohammed Hayani',
    firstname: 'Mohammed',
    lastname: 'El Korchi',
    // email: 'logimek72@gmail.com',
    email: 'mek@gmail.com',
    password: 'mek',
    avatar: 'mek.png'
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userApiProvider: UserApiProvider,
    public menuCtrl: MenuController
    ) {
      this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  // Fonction permettant de s'inscrire MongoDB
  // doRegisterOld() {
  //   console.log('doRegister');
  //   let user = new User();
  //   user.firstname = this.account.firstname;
  //   user.lastname = this.account.lastname;
  //   user.email = this.account.email;
  //   user.password = this.account.password;
  //   user.avatar = this.account.avatar;
  //   // user = this.account;
  //   return this.userApiProvider.userRegister(user).subscribe(
  //     (data) => {
  //       console.log(data);
  //       if (!data.error) {
  //         // On stocke le token LocalStorage
  //         localStorage.setItem('userData', JSON.stringify(data));
  //         this.strloginError = "";
  //         // On redirige sur la map générale
  //         // Dans ce cas il ne faut pas mettre de guillements
  //         this.navCtrl.setRoot(HomePage);
  //       }
  //       if (data.error)
  //         // this.strloginError = "User already exists";
  //         this.strloginError = "Utilisateur déjà existant";
  //     },
  //     (err) => {
  //       console.log(err);
  //       if (err.error.httpCode == 500) this.strloginError = "Il y a un problème avec la création du compte";
  //     }
  //   )
  //   // this.navCtrl.setRoot('EventsListPage');
  // }

  // Fonction permettant de se connecter MongoDB
  // doLoginOld() {
  //   console.log('doLogin');
  //     return this.userApiProvider.userLogin({ email: this.account.email, password: this.account.password }).subscribe(
  //       (data) => {
  //         console.log(data);
  //         if (!data.error) {
  //           // On stocke le token LocalStorage
  //           localStorage.setItem('userData', JSON.stringify(data));
  //           // On redirige sur la map générale
  //           // this.navCtrl.push(HomePage);
  //           this.navCtrl.setRoot(HomePage);
  //           // this.navCtrl.setRoot('EventsListPage');
  //           this.strloginError = "";
  //         }
  //         if (data.error)
  //           // this.strloginError = "Login ou password incorrect";
  //           this.strloginError = "Login ou mot de passe incorrect";
  //       },
  //       (err) => {
  //         console.log(err);
  //         if (err.error.httpCode == 402) this.strloginError = "Login ou mot de passe incorrect";
  //         if (err.error.httpCode == 501) this.strloginError = "Utilisateur non trouvé";
  //       }
  //     )
  // }

  // Fonction permettant de se connecter MySql
  doLogin() {
    console.log('login');
      return this.userApiProvider.login({ email: this.account.email, password: this.account.password }).subscribe(
        (data) => {
          console.log(data);
          if (!data.error) {
            localStorage.setItem('userData', JSON.stringify(data));
            this.navCtrl.setRoot(HomePage);
            this.strloginError = "";
          } else {
             this.strloginError = "Login ou mot de passe incorrect";
          }
        },
        (err) => {
          // console.log(err);
          if (err.status == 400) this.strloginError = "Email/password requis ";
        }
      ); 
  }
  // Fonction permettant de s'inscrire MySql
  doRegister() {
    console.log('doRegister');
    let user = new User();
    user.firstname = this.account.firstname;
    user.lastname = this.account.lastname;
    user.email = this.account.email;
    user.password = this.account.password;
    user.avatar = this.account.avatar;
    // user = this.account;
    return this.userApiProvider.register(user).subscribe(
      (data) => {
        console.log(data);
        if (!data.error) {
          // On stocke le token LocalStorage
          localStorage.setItem('userData', JSON.stringify(data));
          this.strloginError = "";
          // On redirige sur la map générale
          // Dans ce cas il ne faut pas mettre de guillements
          this.navCtrl.setRoot(HomePage);
        }
        if (data.error)
          // this.strloginError = "User already exists";
          this.strloginError = "Utilisateur déjà existant";
      },
      (err) => {
        // console.log(err);
        // if (err.error.httpCode == 500) this.strloginError = "Il y a un problème avec la création du compte";
        if (err.status == 400) this.strloginError = "Email/password requis ";
      }
    );
  }

}
