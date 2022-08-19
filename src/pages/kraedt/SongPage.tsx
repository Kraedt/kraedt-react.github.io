import { Link, useParams } from "react-router-dom";
import { isNullOrWhitespace } from "../../functions";
import { useObservable } from "../../rxjs-functions";
import MusicService from "../../services/music-service";
import { useService } from "../../services/service-resolver";
import { AmazonLink, BeatportLink, getLicense, getMusicItemImage, getSongIdentifier, ItunesLink, YoutubeLinkImage } from "../../types/types"
import { Page } from "../Page";
import { Page404 } from "./Page404";

export const SongPage = () => {
  const { songId } = useParams();
  const musicService = useService(MusicService);
  const songs = useObservable(musicService.Songs);
  const song = songs?.find(s => getSongIdentifier(s) === songId)!

  if (!songs)
    return null;

  if (!isNullOrWhitespace(songId) && song === undefined)
    return <Page404 />;

  const license = getLicense(song.licenseId);

  return (
    <Page title={`${song.artist} - ${song.title}`}>
      <h2 className="see-more-music"><Link to="/music">See More Music</Link></h2>
      <table className="song-page">
        <tbody>
          {/* Image */}
          <tr>
            <td>
              <img src={getMusicItemImage(song)} alt={song.title} />
            </td>
          </tr>

          {/* Artist and title */}

          <tr>
            <td>
              <h2>{song.title}</h2>
              <h3>{song.artist}</h3>
            </td>
          </tr>

          {/* Buy / stream links */}

          <tr>
            <td>
              {song.buyable && <h3 className="darken-text">Buy the song:</h3>}
              {ItunesLink(song.itunesUrl)}
              {BeatportLink(song.beatportUrl)}
              {AmazonLink(song.amazonUrl)}
              {(song.spotifyUrl || song.youtubeId) && (
                <>
                  <h3 className="darken-text">Stream:</h3>
                  <a href="javascript:void(0)" onClick={() => { }}><img src={YoutubeLinkImage} alt='youtube' /></a>
                  {/* todo: spotify embed */}
                </>
              )}
            </td>
          </tr>

          {/* Youtube embed */}

          <tr>
            <td>
              {song.youtubeId && (
                <div id="youtube-embed" style={{ display: 'none' }}>
                  <br />
                  <br />
                  {//% include song-embed.jekyll yt-id=song.yt-id %}
                  }
                  <br />
                  <br />
                </div>
              )}
              <br />
            </td>
          </tr>

          {/* Download button */}

          {song.downloadable ? (
            <tr>
              <td>
                <button className="btn btn-lg btn-warning">DOWNLOAD</button>
                <br />
              </td>
            </tr>
          ) : null}

          {/* Album link */}
          {/*% for album in site.songs %}
        {% if album.layout == "album" and album.songs contains song.name %}
      */}
          <tr>
            <td>
              {//<h3 className="darken-text">Included in: <a href="{{album.url}}">{{ album.title }}</a></h3>
              }
            </td>
          </tr>
          {//% endif %}
          }
          {//% endfor %}
          }

          {/* License info */}

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