import { Link } from "react-router-dom";
import { goToTop } from "../functions";
import { useObservable } from "../rxjs-functions";
import MusicService from "../services/music-service";
import { useService } from "../services/service-resolver";
import { Alias, getAliasName, getMusicItemImage, getMusicPageName, getPathPrefix } from "../types/types";
import { Page } from "../pages/Page";
import ld from 'lodash';

export const AlbumsPage = ({ alias }: { alias: Alias }) => {
  const musicService = useService(MusicService);
  const albums = ld.sortBy(useObservable(musicService.Albums) || [], a => a.id);
  ld.reverse(albums);

  return (
    <Page title={`${getAliasName(alias)} - Albums`}>
      <h2>Albums</h2>

      <div className="w-100">
        <Link to={`${getPathPrefix(alias)}/music`}>See all music</Link>
        <br />
      </div>

      <div className="corner-controls">
        <button onClick={goToTop}><i className="fas fa-arrow-up fa-2x"></i></button>
      </div>

      <table className="music-page">
        <colgroup>
          <col style={{ width: '300px' }}></col>
        </colgroup>
        <tbody>
          {albums?.map(album => {
            const albumPageName = getMusicPageName(album);
            return (
              <tr key={`album-${album.id}`}>
                <td>
                  <Link to={`${getPathPrefix(alias)}/music/album/${albumPageName}`}><img className="image-prop" src={getMusicItemImage(album)} alt='img' /></Link>
                  <div className="mobile-song-info">
                    <h2><Link to={`${getPathPrefix(alias)}/music/album/${albumPageName}`}>{album.title}</Link></h2>
                  </div>
                </td>
                <td className="song-info"><h4><Link to={`${getPathPrefix(alias)}/music/album/${albumPageName}`}>{album.title}</Link></h4></td>
                <td className="song-info">{album.year}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Page >
  )
}