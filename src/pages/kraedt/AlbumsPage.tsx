import { Link } from "react-router-dom"
import { goToTop } from "../../functions"
import { useObservable } from "../../rxjs-functions"
import MusicService from "../../services/music-service"
import { useService } from "../../services/service-resolver"
import { getMusicItemImage, getMusicPageName } from "../../types/types"
import { Page } from "../Page"

export const AlbumsPage = () => {
  const musicService = useService(MusicService);
  const albums = useObservable(musicService.Albums);

  return (
    <Page title='Kraedt - Albums'>
      <h2>Albums</h2>

      <div className="w-100">
        <Link to="/music" >See all music</Link>
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
              <tr key={album.id}>
                <td>
                  <Link to={`music/album/${albumPageName}`}><img className="image-prop" src={getMusicItemImage(album)} alt='img' /></Link>
                  <div className="mobile-song-info">
                    <h2><Link to={`music/album/${albumPageName}`}>${album.title}</Link></h2>
                  </div>
                </td>
                <td className="song-info"><h4><a href={`music/album/${albumPageName}`}>{album.title}</a></h4></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Page >
  )
}