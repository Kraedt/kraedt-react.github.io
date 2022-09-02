import * as Rx from 'rxjs';
import * as Rxo from 'rxjs/operators';
import { Service } from './service-resolver';
import { ajaxPost, ajaxPostJson } from '../rxjs-functions';
import { Album, Song } from '../types/types';
import MusicService from './music-service';
import { getClientId } from '../functions';

const adminAuthKeyKey = 'adminAuthKey';
const authorize = new Rx.Subject();

const addSongIntent = new Rx.Subject<Song>();
const editSongIntent = new Rx.Subject<Song>();
const deleteSongIntent = new Rx.Subject<number>();

const addAlbumIntent = new Rx.Subject<Album>();
const editAlbumIntent = new Rx.Subject<Album>();
const deleteAlbumIntent = new Rx.Subject<number>();

const editSpotlightIntent = new Rx.Subject<string>();

const adminHeaders = () => ({ clientId: getClientId() })

let instance: Service;

export default class AdminService implements Service {
  TypeName: string;

  musicService?: MusicService;
  Authorization: Rx.Observable<boolean> = authorize.pipe(
    Rxo.startWith(undefined),
    Rxo.map(() => ({ userKey: localStorage.getItem(adminAuthKeyKey) })),
    ajaxPost('reactAdmin/authorize', adminHeaders()),
    Rxo.map((r: any) => (r?.response?.authOk ?? false) === true),
  );

  constructor() {
    this.TypeName = 'AdminService';

    if (!!instance)
      return;
    instance = this;

    addSongIntent.pipe(
      ajaxPostJson('reactAdmin/addSong', adminHeaders()),
      Rxo.tap(() => this.musicService?.Intents.ReloadSongs.next({}))
    ).subscribe();
    editSongIntent.pipe(
      ajaxPostJson('reactAdmin/editSong', adminHeaders()),
      Rxo.tap(() => this.musicService?.Intents.ReloadSongs.next({}))
    ).subscribe();
    deleteSongIntent.pipe(
      Rxo.map(_ => ({ songId: _ })),
      ajaxPost('reactAdmin/deleteSong', adminHeaders()),
      Rxo.tap(() => this.musicService?.Intents.ReloadSongs.next({}))
    ).subscribe();

    addAlbumIntent.pipe(
      ajaxPostJson('reactAdmin/addAlbum', adminHeaders()),
      Rxo.tap(() => this.musicService?.Intents.ReloadAlbums.next({}))
    ).subscribe();
    editAlbumIntent.pipe(
      ajaxPostJson('reactAdmin/editAlbum', adminHeaders()),
      Rxo.tap(() => this.musicService?.Intents.ReloadAlbums.next({}))
    ).subscribe();
    deleteAlbumIntent.pipe(
      Rxo.map(_ => ({ albumId: _ })),
      ajaxPost('reactAdmin/deleteAlbum', adminHeaders()),
      Rxo.tap(() => this.musicService?.Intents.ReloadAlbums.next({}))
    ).subscribe();

    editSpotlightIntent.pipe(
      Rxo.map(_ => ({ spotlight: _ })),
      ajaxPost('reactAdmin/editSpotlight', adminHeaders()),
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