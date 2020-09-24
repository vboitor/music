import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Song } from '../models/songs';
import { Album } from '../models/albums';
import { Artist } from '../models/artists';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  jwt_token=`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;

  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.jwt_token
  });
  httpOptions: {};
  apiURL: string = 'http://localhost:5000';

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {headers: this.reqHeader};
  }

  public getSongs(): Observable<Song[]>{
    return this.httpClient.get<Song[]>(`${this.apiURL}/songs`, this.httpOptions);
  }
  public getAlbums(): Observable<Album[]>{
    return this.httpClient.get<Album[]>(`${this.apiURL}/albums`, this.httpOptions);
  }
  public getArtists(): Observable<Artist[]>{
    return this.httpClient.get<Artist[]>(`${this.apiURL}/artists`, this.httpOptions);
  }
  public getAllData(): Observable<any[]> {
    let artists = this.getArtists();
    let albums = this.getAlbums();
    let songs = this.getSongs();
    return forkJoin([artists, albums, songs]);
  }
}
