import { Link, } from "react-router-dom";
import { goToTop } from "../../functions";
import { useObservable } from "../../rxjs-functions";
import MusicService from "../../services/music-service";
import { useService } from "../../services/service-resolver";
import { AmazonLink, BeatportLink, DirectDownloadLink, getLicense, getLicenseIcon, getMusicItemImage, getMusicPageName, getSongIdentifier, ItunesLink } from "../../types/types";
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
        <Link to="/albums" >See all albums</Link>

        {safeOnly
          ? <Link className="float-right fa-lg" to="/music">Show all music</Link>
          : <Link className="float-right fa-lg" to="/music-creator-friendly">Show only Content-Creator-Friendly music</Link>}
        <br />
      </div>

      <div className="corner-controls">
        <button onClick={() => goToTop()}>
          <i className="fas fa-arrow-up fa-2x" />
        </button>
      </div>

      <table id="music-table" className="music-page">
        <tbody>

          {songs?.map(song => {
            const songPageName = getMusicPageName(song);
            const licenseIcon = getLicenseIcon(song.licenseId);
            return (
              <tr key={song.id}>
                <td>
                  <Link to={`song/${songPageName}`}><img className="image-prop" src={getMusicItemImage(song)} alt={song.title} /></Link>

                  <div className="mobile-song-info">
                    <h2><Link to={`song/${songPageName}`}>{song.title}</Link>{licenseIcon}</h2>
                    <p>{song.artist}</p>
                  </div>
                </td>
                <td className="song-info">
                  <Link to={`song/${songPageName}`}>{song.title}</Link>&nbsp;{licenseIcon}
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
            )
          })}
        </tbody>
      </table>
    </Page >
  )
}