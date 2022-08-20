import styles from './Dashboard.module.scss';
import { useObservable } from "../../rxjs-functions";
import MusicService from "../../services/music-service";
import { useService } from "../../services/service-resolver";
import { Page } from '../Page';
import { useEffect, useState } from 'react';
import { getLicenseToolTip, Song } from '../../types/types';
import AdminService from '../../services/admin-service';

interface ControlProps<T> {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  value?: T;
  onChange?: (v: T) => void;
}

const TextBasedControl = <T extends string | number | undefined>({ label, type, value, onChange }: ControlProps<T>) => (
  <>
    <label>{label}</label>
    <input type={type ?? 'text'} value={value ?? ''} checked={typeof value === 'boolean' ? value as boolean : undefined} onChange={(v) => onChange && onChange(v.target.value as T)} />
  </>
)

const CheckboxControl = ({ label, value, onChange }: ControlProps<boolean>) => (
  <>
    <label>{label}</label>
    <input type='checkbox' checked={value ?? false} onChange={(v) => onChange && onChange(v.target.checked)} />
  </>
)

const defaultSong: Song = {
  id: 0,
  title: '',
  artist: '',
  genre: '',
  licenseId: 0
}

const AddEditSong = ({ editSong, onCancel, onSubmit }: { onSubmit: (song: Song) => void, editSong?: Song, onCancel?: () => void }) => {
  const [state, setState] = useState<Partial<Song>>(editSong ?? defaultSong);
  const edit = editSong !== undefined;
  const {
    id,
    title,
    artist,
    genre,
    imageUrl,
    buyable,
    downloadable,
    downloadUrl,
    youtubeId,
    itunesUrl,
    beatportUrl,
    amazonUrl,
    spotifyUrl,
    licenseId
  } = state;

  useEffect(() => setState(editSong ?? defaultSong), [editSong])

  return (
    <div className={styles.panel}>
      <button className='icon-button float-right' onClick={() => { onCancel?.(); setState(defaultSong) }}><i className={'fa fa-times'} /></button>
      <h4>{edit ? 'Edit' : 'Add'} Song{edit && ` (${artist} - ${title})`}</h4>
      <TextBasedControl label='Id' value={id} onChange={(v) => setState({ ...state, id: v })} />
      <TextBasedControl label='Title' value={title} onChange={(v) => { setState({ ...state, title: v }) }} />
      <TextBasedControl label='Artist' value={artist} onChange={(v) => { setState({ ...state, artist: v }) }} />
      <TextBasedControl label='Genre' value={genre} onChange={(v) => { setState({ ...state, genre: v }) }} />
      <TextBasedControl label='Image Url' value={imageUrl} onChange={(v) => { setState({ ...state, imageUrl: v }) }} />
      <CheckboxControl label='Buyable' type='checkbox' value={buyable} onChange={(v) => { setState({ ...state, buyable: v }) }} />
      <br />
      <CheckboxControl label='Downloadable' type='checkbox' value={downloadable} onChange={(v) => { setState({ ...state, downloadable: v }) }} />
      <br />
      <TextBasedControl label='Download Url' value={downloadUrl} onChange={(v) => { setState({ ...state, downloadUrl: v }) }} />
      <TextBasedControl label='Youtube Id' value={youtubeId} onChange={(v) => { setState({ ...state, youtubeId: v }) }} />
      <TextBasedControl label='Itunes Url' value={itunesUrl} onChange={(v) => { setState({ ...state, itunesUrl: v }) }} />
      <TextBasedControl label='Beatport Url' value={beatportUrl} onChange={(v) => { setState({ ...state, beatportUrl: v }) }} />
      <TextBasedControl label='Amazon Url' value={amazonUrl} onChange={(v) => { setState({ ...state, amazonUrl: v }) }} />
      <TextBasedControl label='Spotify Url' value={spotifyUrl} onChange={(v) => { setState({ ...state, spotifyUrl: v }) }} />
      <span title={getLicenseToolTip()}>
        <TextBasedControl label='License Id' value={licenseId} onChange={(v) => { setState({ ...state, licenseId: v }) }} />
      </span>
      <button onClick={() => onSubmit({ ...defaultSong, ...state })}>Submit</button>
    </div>
  )
}

type ViewMode = 'songs' | 'albums';

const SongsList = ({ songs }: { songs: Song[] }) => {
  const adminService = useService(AdminService);
  const addSongIntent = adminService.Intents.AddSong;
  const [editSong, setEditSong] = useState<Song | undefined>();
  return (
    <>
      <div className={styles.create}>
        <AddEditSong
          editSong={editSong}
          onSubmit={(s) => addSongIntent.next(s)}
          onCancel={() => setEditSong(undefined)} />
      </div>
      <h3>Songs</h3>
      <table className={styles.songList}>
        <tbody>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Genre</th>
            <th>D+</th>
            <th>B+</th>
            <th>Download Url</th>
            <th>Image Url</th>
            <th>Youtube Id</th>
            <th>Itunes Url</th>
            <th>Beatport Url</th>
            <th>Amazon Url</th>
            <th>Spotify Url</th>
            <th>License Id</th>
            <th>Actions</th>
          </tr>
          {songs.map(song => (
            <tr key={song.id}>
              <td>{song.id}</td>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.genre}</td>
              <td>{song.downloadable && 'x'}</td>
              <td>{song.buyable && 'x'}</td>
              <td>{song.downloadUrl}</td>
              <td>{song.imageUrl}</td>
              <td>{song.youtubeId}</td>
              <td>{song.itunesUrl}</td>
              <td>{song.beatportUrl}</td>
              <td>{song.amazonUrl}</td>
              <td>{song.spotifyUrl}</td>
              <td>{song.licenseId}</td>
              <td>
                <button onClick={() => setEditSong(song)}>Edit</button>
                <button onClick={() => {
                  const p = prompt(`Are you sure you want to delete ${song.artist} - ${song.title}? Type 'DELETE' to confirm.`)
                  if (p === 'DELETE')
                    console.log('deleted')
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

const AlbumsList = () => {
  return (
    <>
      <h3>Albums</h3>
      <table className={styles.songList}>
      </table>
    </>
  )
}

export const Dashboard = () => {
  const musicService = useService(MusicService);
  const songs = useObservable(musicService.Songs) || [];
  const [viewMode, setViewMode] = useState<ViewMode>('songs');

  const renderView = (viewMode: ViewMode) => {
    switch (viewMode) {
      case 'songs': return <SongsList songs={songs} />
      case 'albums': return <AlbumsList />
    }
  }

  return (
    <Page title="Kraedt - Admin">
      <div className={styles.container}>
        <div className={styles.modeSelector}>
          <button className={viewMode === 'songs' ? styles.activeMode : ''} onClick={() => setViewMode('songs')}>Songs</button>
          <button className={viewMode === 'albums' ? styles.activeMode : ''} onClick={() => setViewMode('albums')}>Albums</button>
        </div>
        {renderView(viewMode)}
      </div>
    </Page >
  )
}