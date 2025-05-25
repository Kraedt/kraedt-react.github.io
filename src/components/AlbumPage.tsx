import { Link, useParams } from "react-router-dom";
import { isNullOrWhitespace } from "../functions";
import { useObservable } from "../rxjs-functions";
import MusicService from "../services/music-service";
import { useService } from "../services/service-resolver";
import { Alias, AmazonLink, BeatportLink, getAliasName, getDriveDirectDownload, getLicenseIcon, getMusicItemImage, getMusicPageName, getPathPrefix, ItunesLink, SpotifyLink } from "../types/types";
import { Page } from "../pages/Page"
import { Page404 } from "./Page404";

export const AlbumPage = ({ alias }: { alias: Alias }) => {
  const { albumPageName } = useParams();
  const musicService = useService(MusicService);
  const albums = useObservable(musicService.Albums);
  const allSongs = useObservable(musicService.Songs);

  if (!albums)
    return null;

  let error = false;
  let album = undefined
  try {
    album = albums?.find(a => getMusicPageName(a) === albumPageName)
  }
  catch {
    error = true
  }
  if ((!isNullOrWhitespace(albumPageName) && album === undefined) || album === undefined || error)
    return <Page404 />;

  const albumSongIds = JSON.parse(album.songIds) as number[];
  const songs = allSongs?.filter(s => albumSongIds.includes(s.id));

  return (
    <Page title={`${getAliasName(alias)} - ${album.title}`}>
      <h2><Link to={`${getPathPrefix(alias)}/music`}>See More Music</Link></h2>
      <table id="album-table" className="song-page">
        <tbody>
          <tr><td><h3>Album / EP</h3></td></tr>
          <tr>
            <td><img src={getMusicItemImage(album)} alt='album' width={300} height={300} /></td>
          </tr>
          <tr>
            <td>
              <h2>{album.title}</h2>
              <h3>{album.year}</h3>
            </td>
          </tr>
          <tr>
            <td className='audio-links'>
              {album.buyable && <h3 className="darken-text">Buy:</h3>}
              {ItunesLink(album.itunesUrl)}
              {BeatportLink(album.beatportUrl)}
              {AmazonLink(album.amazonUrl)}
              {album.spotifyUrl && <h3 className="darken-text">Stream:</h3>}
              {SpotifyLink(album.spotifyUrl)}
            </td>
          </tr>
          {
            songs?.map(s => s.downloadable && !!s.downloadUrl && (
              <tr key={s.id}>
                <td>
                  <h3><Link to={`${getPathPrefix(alias)}/music/song/${getMusicPageName(s)}`} className="inline-a">{s.title}</Link>&nbsp;{getLicenseIcon(s.licenseId)}</h3>
                  <a className="btn btn-lg btn-download" href={getDriveDirectDownload(s.downloadUrl)}>DOWNLOAD</a>
                </td>
              </tr>
            ))
          }
          <tr><td><br /></td></tr>
        </tbody>
      </table>
    </Page>
  )
}