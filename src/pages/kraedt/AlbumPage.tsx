import { Link, useParams } from "react-router-dom";
import { isNullOrWhitespace } from "../../functions";
import { useObservable } from "../../rxjs-functions";
import MusicService from "../../services/music-service";
import { useService } from "../../services/service-resolver";
import { AmazonLink, BeatportLink, getLicenseIcon, getMusicItemImage, getMusicPageName, ItunesLink, SpotifyLink } from "../../types/types";
import { Page } from "../Page"
import { Page404 } from "./Page404";

export const AlbumPage = () => {
  const { albumPageName } = useParams();
  const musicService = useService(MusicService);
  const albums = useObservable(musicService.Albums);
  const allSongs = useObservable(musicService.Songs);

  if (!albums)
    return null;

  const album = albums?.find(a => getMusicPageName(a) === albumPageName)!
  const albumSongIds = JSON.parse(album.songs) as number[];

  if (!isNullOrWhitespace(albumPageName) && album === undefined)
    return <Page404 />;

  const songs = allSongs?.filter(s => albumSongIds.includes(s.id));

  return (
    <Page title={`Kraedt - ${album.title}`}>
      <h2><a href="/music">See More Music</a></h2>
      <table id="album-table" className="song-page">
        <tbody>
          <tr><td><h3>Album / EP</h3></td></tr>
          <tr>
            <td><img src={getMusicItemImage(album)} alt='album' /></td>
          </tr>
          <tr>
            <td>
              <h2>{album.title}</h2>
            </td>
          </tr>
          <tr>
            <td>
              {album.buyable && <h3 className="darken-text">Buy:</h3>}
              {ItunesLink(album.itunesUrl)}
              {BeatportLink(album.beatportUrl)}
              {AmazonLink(album.amazonUrl)}
              {album.spotifyUrl && <h3 className="darken-text">Stream:</h3>}
              {SpotifyLink(album.spotifyUrl)}
            </td>
          </tr>
          {
            songs?.map(s => (
              <tr key={s.id}>
                <td>
                  <h3><Link to={`/music/song/${getMusicPageName(s)}`} className="inline-a">{s.title}</Link>&nbsp;{getLicenseIcon(s.licenseId)}</h3>
                  <button className="btn btn-lg btn-warning" onClick={() => { }}>DOWNLOAD</button>
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