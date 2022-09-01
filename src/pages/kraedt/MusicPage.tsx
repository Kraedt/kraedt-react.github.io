import { Link, } from "react-router-dom";
import { useObservable } from "../../rxjs-functions";
import MusicService from "../../services/music-service";
import { useService } from "../../services/service-resolver";
import { AmazonLink, BeatportLink, DirectDownloadImage, getLicense, getLicenseIcon, getMusicItemImage, getMusicPageName, ItunesLink } from "../../types/types";
import { Page } from "../Page";
import * as ld from 'lodash';
import { GoToTopButton } from "../../layout/GoToTopButton";
import InteractService from "../../services/interact-service";

export const MusicPage = ({ safeOnly }: { safeOnly?: boolean }) => {
  const musicService = useService(MusicService);
  const interactService = useService(InteractService);

  const allSongs = ld.reverse(useObservable(musicService.Songs) || []);

  const songs = safeOnly
    ? allSongs?.filter(x => getLicense(x.licenseId).level === 1)
    : allSongs;

  const DirectDownloadLink = (songId: number, downloadable?: boolean) => downloadable && <button className="direct-dl-btn" onClick={() => interactService.Intents.Download.next(songId)}><img src={DirectDownloadImage} alt="direct-download" /></button>

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
      <GoToTopButton />
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