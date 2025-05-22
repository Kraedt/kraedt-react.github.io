import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { isNullOrWhitespace } from "../../functions";
import { useObservable } from "../../rxjs-functions";
import MusicService from "../../services/music-service";
import { useService } from "../../services/service-resolver";
import { Alias, AmazonLink, BeatportLink, getDriveDirectDownload, getLicense, getMusicItemImage, getMusicPageName, getPathPrefix, ItunesLink, SpotifyLink, YoutubeLinkImage } from "../../types/types"
import { Page } from "../Page";
import { Page404 } from "./Page404";

interface Props {
  alias: Alias;
}

export const SongPage = ({ alias }: Props) => {
  const { songPageName } = useParams();
  const musicService = useService(MusicService);
  const songs = useObservable(musicService.Songs);
  const allAlbums = useObservable(musicService.Albums);
  const song = songs?.find(s => getMusicPageName(s) === songPageName)!
  const [ytEnabled, setYtEnabled] = useState(false);

  if (!songs)
    return null;

  if (!isNullOrWhitespace(songPageName) && song === undefined)
    return <Page404 />;

  const matchingAlbum = allAlbums?.find(a => JSON.parse(a.songIds).includes(song.id));
  const license = getLicense(song.licenseId);

  return (
    <Page title={`${song.artist} - ${song.title}`}>
      <h2 className="see-more-music"><Link to={`${getPathPrefix(alias)}/music`}>See More Music</Link></h2>
      <table className="song-page">
        <tbody>
          <tr>
            <td>
              <img src={getMusicItemImage(song)} alt={song.title} width={300} height={300} />
            </td>
          </tr>
          <tr>
            <td>
              <h2>{song.title}</h2>
              <h3>{song.artist}</h3>
              <h3>{song.year}</h3>
            </td>
          </tr>
          <tr>
            <td className='audio-links'>
              {song.buyable && <h3 className="darken-text">Buy:</h3>}
              {ItunesLink(song.itunesUrl)}
              {BeatportLink(song.beatportUrl)}
              {AmazonLink(song.amazonUrl)}
              {(song.spotifyUrl || song.youtubeId) && (
                <>
                  <h3 className="darken-text">Stream:</h3>
                  {SpotifyLink(song.spotifyUrl)}
                  {song.youtubeId && <button className="icon-button" onClick={() => { setYtEnabled(!ytEnabled) }}><img src={YoutubeLinkImage} alt='youtube' /></button>}
                </>
              )}
            </td>
          </tr>
          <tr>
            <td>
              {song.youtubeId && (
                <div id="youtube-embed" style={{ display: ytEnabled ? 'initial' : 'none' }}>
                  <br />
                  <iframe title='youtube' width="300" height="200" src={`https://www.youtube.com/embed/${song.youtubeId}?rel=0`} frameBorder="0" allowFullScreen></iframe>
                  <br />
                </div>
              )}
              <br />
            </td>
          </tr>
          {song.downloadable && song.downloadUrl && (
            <tr>
              <td>
                <a className="btn btn-lg btn-download" href={getDriveDirectDownload(song.downloadUrl)}>DOWNLOAD</a>
                <br />
              </td>
            </tr>
          )}
          {matchingAlbum && (
            <tr>
              <td>
                <h3 className="darken-text">Included in: <Link to={`${getPathPrefix(alias)}/music/album/${getMusicPageName(matchingAlbum)}`}>{matchingAlbum.title}</Link></h3>
              </td>
            </tr>
          )}
          <tr>
            <td>
              <h3 className="darken-text">License Information:</h3>
              <p>{license.desc}</p>
              {license.infoUrl && <a href={license.infoUrl} target="_blank" rel='noreferrer'>More Info</a>}
            </td>
          </tr>
        </tbody>
      </table>
    </Page>
  )
}