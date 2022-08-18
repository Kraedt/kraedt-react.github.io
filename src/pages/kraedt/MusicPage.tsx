import { Link } from "react-router-dom";
import { goToTop } from "../../functions";
import { useObservable } from "../../rxjs-functions";
import MusicService from "../../services/music-service";
import { useService } from "../../services/service-resolver";
import { DirectDownloadImage, externalLink, getLicenseIcon, getMusicItemImage, getSongIdentifier } from "../../types/types";
import { Page } from "../Page";

export const MusicPage = () => {
  const musicService = useService(MusicService);
  const songs = useObservable(musicService.Songs);

  return (
    <Page title="Kraedt - Music">
      <h2>Music</h2>

      <div className="w-100">
        <a href="/albums" >See all albums</a>

        {// todo: filter safe
          //<a className="pull-right fa-lg" href="/music">Show all music</a>
          //else
          //<a className="pull-right fa-lg" href="/music-creator-friendly">Show only Content-Creator-Friendly music</a>
        }
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
                  {song.downloadable ? <button className="direct-dl-btn" onClick={() => { }}><img src={DirectDownloadImage} alt="direct" /></button> : null}
                  {externalLink('Spotify', song.spotifyUrl, 'spotify.png')}
                  {externalLink('iTunes', song.itunesUrl, 'itunes.png')}
                  {externalLink('Beatport', song.beatportUrl, 'beatport.png')}
                  {externalLink('Amazon', song.amazonUrl, 'amazon.png')}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Page >
  )
}