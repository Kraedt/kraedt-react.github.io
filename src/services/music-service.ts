import * as Rx from 'rxjs';
import * as Rxo from 'rxjs/operators';
import { Service } from './service-resolver';
import { ajaxGet } from '../rxjs-functions';
import { Song } from '../types/types';

const reloadSongs = new Rx.Subject();

export default class MusicService implements Service {
  Songs: Rx.Observable<Song[]> = Rx.EMPTY.pipe(
    Rxo.startWith(undefined),
    Rx.mergeWith(reloadSongs),
    ajaxGet('meta/songs'),
  )

  Intents = {
    ReloadSongs: reloadSongs
  }
}