import * as Rx from 'rxjs';
import * as Rxo from 'rxjs/operators';
import { Service } from './service-resolver';
import { ajaxGet } from '../rxjs-functions';
import { Album, Song, Spotlight } from '../types/types';

const reloadSongs = new Rx.Subject();
const reloadAlbums = new Rx.Subject();
const reloadSpotlight = new Rx.Subject();

export default class MusicService implements Service {
  Songs: Rx.Observable<Song[]> = Rx.EMPTY.pipe(
    Rxo.startWith(undefined),
    Rx.mergeWith(reloadSongs),
    ajaxGet('meta/songs'),
  )

  Albums: Rx.Observable<Album[]> = Rx.EMPTY.pipe(
    Rxo.startWith(undefined),
    Rx.mergeWith(reloadAlbums),
    ajaxGet('meta/albums'),
  )

  Spotlight: Rx.Observable<Spotlight> = Rx.EMPTY.pipe(
    Rxo.startWith(undefined),
    Rx.mergeWith(reloadSpotlight),
    ajaxGet('meta/spotlight'),
  )

  Intents = {
    ReloadSongs: reloadSongs,
    ReloadAlbums: reloadAlbums,
    ReloadSpotlight: reloadSpotlight
  }
}