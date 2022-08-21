import { Link, useParams } from "react-router-dom";
import { useObservable } from "../../rxjs-functions";
import MusicService from "../../services/music-service";
import { useService } from "../../services/service-resolver";
import { getMusicPageName, getSongIdentifier } from "../../types/types";
import { Page } from "../Page"

export const AlbumPage = () => {
  const { albumId } = useParams();
  const musicService = useService(MusicService);
  const albums = useObservable(musicService.Albums);
  const album = albums?.find(a => getMusicPageName(a) === albumId)!

  return (
    <Page title={`Kraedt - ${album.title}`}>

      <h2><a href="/music">See More Music</a></h2>

      <table id="album-table" className="song-page">
        <tr><td><h3>Album / EP</h3></td></tr>
        <tr>
          <td><img src="/assets/images/songs/{{ image-url }}" /></td>
        </tr>
        <tr>
          <td>
            <h2>{album.title}</h2>
          </td>
        </tr>
        <tr>
          <td>
          </td>
        </tr>
        <tr>
          <td>
            <h3><Link to='' className="inline-a">{{ song: album.title }}</Link>{/* license stuff*/}</h3>
            <button className="btn btn-lg btn-warning" onClick={() => { }}>DOWNLOAD</button>
          </td>
        </tr>
        <tr><td><br /></td></tr>
      </table>
    </Page>
  )
}