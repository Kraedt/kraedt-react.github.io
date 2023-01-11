import * as Rx from 'rxjs';
import * as Rxo from 'rxjs/operators';
import { Service } from './service-resolver';
import { Album, ArtistData, Song, Spotlight } from '../types/types';
import { kraedtData } from '../data';

const blankData: ArtistData = {
  spotlight: { songIds: "[]" },
  songs: [],
  albums: []
}

const reloadSongs = new Rx.Subject();
const reloadAlbums = new Rx.Subject();
const reloadSpotlight = new Rx.Subject();

let instance: Service;

export default class MusicService implements Service {
  TypeName: string;
  Data = kraedtData;

  constructor() {
    this.TypeName = 'MusicService';

    if (!!instance) // todo: maybe find a workaround for this bs in the future?
      return;
    instance = this;
    const t = kraedtData;
    console.log(typeof t); // to shut it up for now
  }

  async FetchData(jsonFileUri: string) {
    jsonFileUri = 'https://www.googleapis.com/drive/v3/files/1UgSv7bkPNAbWP5yokSTd7FHlTyPivorL?alt=media';

    var setHeaders = new Headers();
    //setHeaders.append('Authorization', 'Bearer ' + authToken.access_token);
    setHeaders.append('Content-Type', 'json');

    var setOptions = {
      method: 'GET',
      headers: setHeaders,
      crossDomain: true
    };
    return await fetch(jsonFileUri, setOptions)
      .then(response => {
        if (response.ok) {
          var reader = response!.body!.getReader();
          var decoder = new TextDecoder();
          reader.read().then(function (result) {
            var data = {}
            data = decoder.decode(result.value, { stream: !result.done });
            console.log(data);
            return data;
          });
        }
        else {
          console.log(response);
          console.log("Response wast not ok");
        }
      }).catch(error => {
        console.log("There is an error " + error.message);
      });
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