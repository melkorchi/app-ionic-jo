import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class RssProvider {

  constructor(public http: Http) {
    console.log('Hello RssProvider Provider');
  }

  getRss() {
    let postData = new FormData();
    // postData.append('rss_url', 'http://feeds.feedburner.com/dinamalar/Front_page_news');
    postData.append('rss_url', 'https://www.lequipe.fr/rss/actu_rss.xml');
    postData.append('api_key', 'vjxevjenhytv8qieudyzzepqfpkhmmeann7meyoi');
    postData.append('count', '20');

    // const RSS_URL: any = 'http://feeds.feedburner.com/dinamalar/Front_page_news';
    // const API: any = 'vjxevjenhytv8qieudyzzepqfpkhmmeann7meyoi';
    // const count: any = 20;
    const API_URL: any = 'https://api.rss2json.com/v1/api.json';

    const response = this.http.post(API_URL, postData).map(res => res.json());
    // const response = this.http.post(API_URL, {'rss_url': 'RSS_URL', 'api_key': API, 'count': count}).map(res => res.json());

    console.log(response);
    return response;
  }

  // getRss2(): Observable<any> {
  //   return this.http.post(
  //     "https://api.rss2json.com/v1/api.json", 
  //     JSON.stringify({'rss_url': 'http://feeds.feedburner.com/dinamalar/Front_page_news', 'api_key': 'vjxevjenhytv8qieudyzzepqfpkhmmeann7meyoi', 'count': 20}), 
  //     {headers: { 'Content-Type': 'application/json' }
  //   });
  // }
}
