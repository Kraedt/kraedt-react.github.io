import * as Rx from 'rxjs';
import * as Rxo from 'rxjs/operators';
import { Service } from './service-resolver';
import { ajaxPostJson } from '../rxjs-functions';
import { Song } from '../types/types';

const addSongIntent = new Rx.Subject<Song>();

export default class AdminService implements Service {

  constructor() {
    addSongIntent.pipe(
      ajaxPostJson('reactadmin/addsong')
    ).subscribe();
  }

  Intents = {
    AddSong: addSongIntent,
  }
}