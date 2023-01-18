import * as Rx from 'rxjs';
import * as Rxo from 'rxjs/operators';
import { Service } from './service-resolver';
import { Album, Alias, ArtistData, getAliasKey, Song, Spotlight } from '../types/types';

let instance: Service;

const dataIntent = new Rx.Subject<ArtistData>();

export default class MusicService implements Service {
  TypeName: string;

  constructor() {
    this.TypeName = 'MusicService';

    if (!!instance) // todo: maybe find a workaround for this bs in the future?
      return;
    instance = this;
  }

  async Initialize(alias: Alias) {
    const uri = `https://us-central1-kraedtwebsite.cloudfunctions.net/fetchdata?datakey=${getAliasKey(alias)}`;
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
      .then(response => response.json())
      .catch(error => {
        console.log("There is an error " + error.message);
        return null;
      });

    if (result !== null)
      dataIntent.next(result);
  }

  Songs: Rx.Observable<Song[]> = dataIntent.pipe(
    Rxo.map(x => x.songs),
    Rxo.shareReplay()
  )

  Albums: Rx.Observable<Album[]> = dataIntent.pipe(
    Rxo.map(x => x.albums),
    Rxo.shareReplay()
  )

  Spotlight: Rx.Observable<Spotlight> = dataIntent.pipe(
    Rxo.map(x => x.spotlight),
    Rxo.shareReplay()
  )

  Intents = {
  }
}