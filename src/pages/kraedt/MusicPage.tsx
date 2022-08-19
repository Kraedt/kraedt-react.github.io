import { Link } from "react-router-dom";
import { goToTop } from "../../functions";
import { useObservable } from "../../rxjs-functions";
import MusicService from "../../services/music-service";
import { useService } from "../../services/service-resolver";
import { AmazonLink, BeatportLink, DirectDownloadLink, getLicense, getLicenseIcon, getMusicItemImage, getSongIdentifier, ItunesLink } from "../../types/types";
import { Page } from "../Page";
import * as ld from 'lodash';

export const MusicPage = ({ safeOnly }: { safeOnly?: boolean }) => {
  const musicService = useService(MusicService);
  const allSongs = ld.reverse(useObservable(musicService.Songs) || []);

  const songs = safeOnly
    ? allSongs?.filter(x => getLicense(x.licenseId).level === 1)
    : allSongs;

  return (
    <Page title="Kraedt - Music">
      <h2>Music</h2>

      <div className="w-100">
        <a href="/albums" >See all albums</a>

        <Link className="pull-right fa-lg" to="/music">Show all music</Link>
        <Link className="pull-right fa-lg" to="/music-creator-friendly">Show only Content-Creator-Friendly music</Link>
        <br />
      </div>

      <div className="corner-controls">
        <a onClick={() => goToTop()} href="javascript:void(0)">
          <i className="fas fa-arrow-up fa-2x" />
        </a>
        {/*<button onClick={() => goToTop()}>
          <i className="fas fa-arrow-up fa-2x" />
        </button>
      */}
      </div>

      <table id="music-table" className="music-page">
        <tbody>

          {songs?.map(song => (
            <tr key={song.id}>
              <td>
                <Link to={`song/${song.id}`}><img className="image-prop" src={getMusicItemImage(song)} alt={song.title} /></Link>

                <div className="mobile-song-info">
                  <h2><Link to={`song/${getSongIdentifier(song)}`}>{song.title}</Link>{getLicenseIcon(song.licenseId)}</h2>
                  <p>{song.artist}</p>
                </div>
              </td>
              <td className="song-info">
                <Link to={`song/${getSongIdentifier(song)}`}>{song.title}</Link>
                {getLicenseIcon(song.licenseId)}
              </td>
              <td className="song-info">{song.artist}</td>
              <td className="song-info">{song.genre}</td>
              <td>
                <div className="audio-links">
                  {DirectDownloadLink(song.id, song.downloadable)}
                  {ItunesLink(song.itunesUrl)}
                  {BeatportLink(song.beatportUrl)}
                  {AmazonLink(song.amazonUrl)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Page >
  )
}