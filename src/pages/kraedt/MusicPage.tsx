import { Link, } from "react-router-dom";
import { useObservable } from "../../rxjs-functions";
import MusicService from "../../services/music-service";
import { useService } from "../../services/service-resolver";
import { AmazonLink, BeatportLink, DirectDownloadLink, getLicense, getLicenseIcon, getMusicItemImage, getMusicPageName, ItunesLink, SpotifyLink } from "../../types/types";
import { Page } from "../Page";
import ld from 'lodash';
import { GoToTopButton } from "../../layout/GoToTopButton";

export const MusicPage = ({ safeOnly }: { safeOnly?: boolean }) => {
  const musicService = useService(MusicService);

  const allSongs = ld.sortBy(useObservable(musicService.Songs) || [], s => s.id);
  ld.reverse(allSongs);

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
      <GoToTopButton />
      <table id="music-table" className="music-page">
        <tbody>
          {songs?.map(song => {
            const songPageName = getMusicPageName(song);
            const licenseIcon = getLicenseIcon(song.licenseId);
            return (
              <tr key={`song-${song.id}`}>
                <td>
                  <Link to={`song/${songPageName}`}><img className="image-prop" src={getMusicItemImage(song)} alt={song.title} /></Link>

                  <div className="mobile-song-info">
                    <h2><Link to={`song/${songPageName}`}>{song.title}</Link>&nbsp;{licenseIcon}</h2>
                    <div>{song.artist}</div>
                  </div>
                </td>
                <td className="song-info">
                  <Link to={`song/${songPageName}`}>{song.title}</Link>&nbsp;{licenseIcon}
                </td>
                <td className="song-info">{song.artist}</td>
                <td className="song-info">{song.year}</td>
                <td className="song-info">{song.genre}</td>
                <td>
                  <div className="audio-links">
                    {DirectDownloadLink(song.downloadUrl, song.downloadable)}
                    {SpotifyLink(song.spotifyUrl)}
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