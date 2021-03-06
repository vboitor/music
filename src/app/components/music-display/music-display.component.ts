import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { Song } from '../../models/songs';
import { Album } from '../../models/albums';
import { Artist } from '../../models/artists';
import { SongsData } from '../../models/songs-data'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-music-display',
  templateUrl: './music-display.component.html',
  styleUrls: ['./music-display.component.scss']
})
export class MusicDisplayComponent implements OnInit,  AfterViewInit  {
  artists: Artist[] = [];
  albums: Album[] = [];
  songs: Song[] = [];
  flatList: SongsData[] = [];

  constructor(private musicService: MusicService) {  }
  displayedColumns: string[] = ['artist_name', 'album_name', 'year_released', 'track','song_name'];
  dataSource = new MatTableDataSource<SongsData>(this.flatList);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.musicService.getAllData().subscribe(
      responseList => {
        this.artists = responseList[0] as Artist[];
        this.albums = responseList[1] as Album[];
        this.songs = responseList[2] as Song[];
        this.flattenLists();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log("set paginator and sort complete..");
      }
    );
  }
  private flattenLists() {
    this.songs.map(song=>{
      let album: Album = this.getAlbum(song.album_id);
      let artist: Artist = this.getArtist(album.artist_id);
      this.flatList.push({
        id: song.id,
        song_name: song.name,
        track: song.track,
        album_id: song.album_id,
        album_name: album.name,
        artist_id: album.artist_id,
        year_released: album.year_released,
        artist_name: artist.name
      })
    });
    console.log("flatlist: ", this.flatList);
  }
  private getAlbum(album_id: number): Album {
    return this.albums.find(album=>album.id==album_id);
  }
  private getArtist(artist_id: number): Artist {
    return this.artists.find(artist=>artist.id==artist_id);
  }
}


