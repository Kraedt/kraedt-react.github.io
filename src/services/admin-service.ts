import * as Rx from 'rxjs';
import * as Rxo from 'rxjs/operators';
import { Service } from './service-resolver';
import { ajaxPost, ajaxPostJson } from '../rxjs-functions';
import { Song } from '../types/types';
import MusicService from './music-service';

const addSongIntent = new Rx.Subject<Song>();
const editSongIntent = new Rx.Subject<Song>();
const deleteSongIntent = new Rx.Subject<number>();

export default class AdminService implements Service {
  musicService?: MusicService;

  constructor() {
    addSongIntent.pipe(
      ajaxPostJson('reactAdmin/addSong'),
      Rxo.tap(() => this.musicService?.Intents.ReloadSongs.next({}))
    ).subscribe();
    editSongIntent.pipe(
      ajaxPostJson('reactAdmin/editSong'),
      Rxo.tap(() => this.musicService?.Intents.ReloadSongs.next({}))
    ).subscribe();
    deleteSongIntent.pipe(
      Rxo.map(_ => ({ songId: _ })),
      ajaxPost('reactAdmin/deleteSong'),
      Rxo.tap(() => this.musicService?.Intents.ReloadSongs.next({}))
    ).subscribe();
  }

  Intents = {
    AddSong: addSongIntent,
    EditSong: editSongIntent,
    DeleteSong: deleteSongIntent,
  }
}