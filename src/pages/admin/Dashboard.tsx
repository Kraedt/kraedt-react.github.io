import styles from './Dashboard.module.scss';
import { useObservable } from "../../rxjs-functions";
import MusicService from "../../services/music-service";
import { useService } from "../../services/service-resolver";
import { Page } from '../Page';

const AddSong = () => {

  return (
    <div className={styles.panel}>
      <form onSubmit={(x) => console.log(x)}>
        <label>Id</label>
        <input type='numeric' name='id' />
      </form>
    </div>
  )
}

export const Dashboard = () => {
  const musicService = useService(MusicService);
  const songs = useObservable(musicService.Songs) || [];

  return (
    <Page title="Kraedt - Admin">
      <div className={styles.container}>
        <br />
        <div className={styles.create}>
          <AddSong />
        </div>
        <br />
        <br />
        <table className={styles.songList}>
          <colgroup>
            <col span={1} />
            <col span={1} />
            <col span={1} />
            <col span={1} />
            <col span={1} />
            <col span={1} />
            <col span={1} />
            <col span={1} />
            <col span={1} />
            <col span={1} />
            <col span={1} />
            <col span={1} />
            <col span={1} />
            <col span={1} />
            <col span={1} />
          </colgroup>
          <thead>
            <th>Id</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Genre</th>
            <th>D+</th>
            <th>B+</th>
            <th>Image Url</th>
            <th>Youtube Id</th>
            <th>Itunes Url</th>
            <th>Beatport Url</th>
            <th>Amazon Url</th>
            <th>Spotify Url</th>
            <th>Genre</th>
            <th>License Id</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {songs.map(song => (
              <tr>
                <td>{song.id}</td>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.genre}</td>
                <td>{song.downloadable}</td>
                <td>{song.buyable}</td>
                <td>{song.downloadUrl}</td>
                <td>{song.imageUrl}</td>
                <td>{song.youtubeId}</td>
                <td>{song.itunesUrl}</td>
                <td>{song.beatportUrl}</td>
                <td>{song.amazonUrl}</td>
                <td>{song.spotifyUrl}</td>
                <td>{song.genre}</td>
                <td>{song.licenseId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  )
}