import { Link, useParams } from "react-router-dom";
import { isNullOrWhitespace } from "../../functions";
import { useObservable } from "../../rxjs-functions";
import MusicService from "../../services/music-service";
import { useService } from "../../services/service-resolver";
import { getMusicItemImage, getSongIdentifier } from "../../types/types"
import { Page } from "../Page";

export const SongPage = () => {
  const { songId } = useParams();
  const musicService = useService(MusicService);
  const songs = useObservable(musicService.Songs);
  let song = songs?.find(s => getSongIdentifier(s) === songId)

  if (isNullOrWhitespace(songId) || song === undefined)
    return null;

  return (
    <Page title={`${song.artist} - ${song.title}`}>
      <h2 className="see-more-music"><Link to="/music">See More Music</Link></h2>
      <table className="song-song">
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
              {/*
            {% if song.buy-able %}
            */}
              <h3 className="darken-text">Buy the song:</h3>
              {/*
            {% include ext-link.jekyll url=song.itunes title='iTunes' img='itunes' %}
            {% include ext-link.jekyll url=song.beatport title='Beatport' img='beatport' %}
            {% include ext-link.jekyll url=song.amazon title='iTunes' img='amazon' %}
            {% endif %}
            {% if song.spotify or song.yt-id %}
            <h3 className="darken-text">Stream:</h3>
            {% if song.yt-id %}
            <a href="javascript:void(0)" onclick="toggleYoutubeEmbed()"><img src="/assets/images/links/youtube.png" /></a>
            {% endif %}
            {% if song.spotify %}
            {% include ext-link.jekyll url=song.spotify title='Spotify' img='spotify' %}
            {% endif %}
            <br />
            {% endif %}
          */}
            </td>
          </tr>

          {/* Youtube embed */}

          <tr>
            <td>
              {//{% if song.yt-id != nil %}
              }
              <div id="youtube-embed" style={{ display: 'none' }}>
                <br />
                <br />
                {//% include song-embed.jekyll yt-id=song.yt-id %}
                }
                <br />
                <br />
              </div>
              <br />
            </td>
          </tr>

          {/* Download button */}

          {//% if song.downloadable %}
          }
          <tr>
            <td>
              <button className="btn btn-lg btn-warning">DOWNLOAD</button>
              <br />
            </td>
          </tr>
          {//% endif %}
          }

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

          {/* License ifno */}

          <tr>
            <td>
              <h3 className="darken-text">License Information:</h3>
              {/*
            {% include license-icon.jekyll licenseId=song.license songId=song.id size="fa-2x" %}
            {% assign license-info = site.data.license | where:'id',song.license %}
            <p>{{ license- info[0].desc}}</p>
            {% if license-info[0].info-url != nil %}
            <a href="{{ license-info[0].info-url }}" target="_blank">More Info</a>
            {% endif %}
      */}
            </td>
          </tr>
        </tbody>
      </table>
    </Page >
  )
}