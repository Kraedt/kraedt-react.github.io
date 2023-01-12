import * as Rx from 'rxjs';
import * as Rxo from 'rxjs/operators';
import { Service } from './service-resolver';
import { Album, ArtistData, Song, Spotlight } from '../types/types';

const reloadSongs = new Rx.Subject();
const reloadAlbums = new Rx.Subject();
const reloadSpotlight = new Rx.Subject();

let instance: Service;

export default class MusicService implements Service {
  TypeName: string;
  Data: ArtistData = { spotlight: { songIds: '' }, songs: [], albums: [] };

  constructor() {
    this.TypeName = 'MusicService';

    if (!!instance) // todo: maybe find a workaround for this bs in the future?
      return;
    instance = this;

    const uri = "https://us-central1-kraedtwebsite.cloudfunctions.net/fetchdata?datakey=kraedt";
    this.FetchData(uri);
  }

  async FetchData(uri: string) {
    var setHeaders = new Headers();
    setHeaders.append('Content-Type', 'application/json');

    var setOptions = {
      method: 'GET',
      headers: setHeaders,
    };
    const result = await fetch(uri, setOptions)
      .then(response => {
        if (response.ok) {
          var reader = response!.body!.getReader();
          var decoder = new TextDecoder();
          return reader.read().then(function (result) {
            var data = {}
            data = decoder.decode(result.value, { stream: !result.done });
            return data as ArtistData;
          });
        }
        else {
          console.log(response);
          console.log("Response wast not ok");
          return null;
        }
      }).catch(error => {
        console.log("There is an error " + error.message);
        return null;
      });

    if (result !== null)
      this.Data = result;
  }

  Songs: Rx.Observable<Song[]> = Rx.EMPTY.pipe(
    Rxo.startWith(this.Data.songs),
    //Rx.mergeWith(reloadSongs),
    //ajaxGet('meta/songs'),
  )

  Albums: Rx.Observable<Album[]> = Rx.EMPTY.pipe(
    Rxo.startWith(this.Data.albums),
    //Rx.mergeWith(reloadAlbums),
    //ajaxGet('meta/albums'),
  )

  Spotlight: Rx.Observable<Spotlight> = Rx.EMPTY.pipe(
    Rxo.startWith(this.Data.spotlight),
    //Rx.mergeWith(reloadSpotlight),
    //ajaxGet('meta/spotlight'),
  )

  Intents = {
    ReloadSongs: reloadSongs,
    ReloadAlbums: reloadAlbums,
    ReloadSpotlight: reloadSpotlight
  }
}