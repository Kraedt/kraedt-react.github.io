import * as Rx from 'rxjs';
import * as Rxo from 'rxjs/operators';
import { Service } from './service-resolver';
import { ajaxPost, ajaxPostJson } from '../rxjs-functions';
import { Album, Song } from '../types/types';
import MusicService from './music-service';

const addSongIntent = new Rx.Subject<Song>();
const editSongIntent = new Rx.Subject<Song>();
const deleteSongIntent = new Rx.Subject<number>();

const addAlbumIntent = new Rx.Subject<Album>();
const editAlbumIntent = new Rx.Subject<Album>();
const deleteAlbumIntent = new Rx.Subject<number>();

const editSpotlightIntent = new Rx.Subject<string>();

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

    addAlbumIntent.pipe(
      ajaxPostJson('reactAdmin/addAlbum'),
      Rxo.tap(() => this.musicService?.Intents.ReloadAlbums.next({}))
    ).subscribe();
    editAlbumIntent.pipe(
      ajaxPostJson('reactAdmin/editAlbum'),
      Rxo.tap(() => this.musicService?.Intents.ReloadAlbums.next({}))
    ).subscribe();
    deleteAlbumIntent.pipe(
      Rxo.map(_ => ({ albumId: _ })),
      ajaxPost('reactAdmin/deleteAlbum'),
      Rxo.tap(() => this.musicService?.Intents.ReloadAlbums.next({}))
    ).subscribe();

    editSpotlightIntent.pipe(
      Rxo.map(_ => ({ spotlight: _ })),
      ajaxPost('reactAdmin/editSpotlight'),
      Rxo.tap(() => this.musicService?.Intents.ReloadSpotlight.next({}))
    ).subscribe();
  }

  Intents = {
    AddSong: addSongIntent,
    EditSong: editSongIntent,
    DeleteSong: deleteSongIntent,

    AddAlbum: addAlbumIntent,
    EditAlbum: editAlbumIntent,
    DeleteAlbum: deleteAlbumIntent,

    EditSpotlight: editSpotlightIntent,
  }
}