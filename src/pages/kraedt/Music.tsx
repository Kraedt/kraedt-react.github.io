import { goToTop, isNullOrWhitespace } from "../../functions";
import { importLinkImages, importSongImages, NoImage } from "../../helpers";
import { useObservable } from "../../rxjs-functions";
import MusicService from "../../services/music-service";
import { useService } from "../../services/service-resolver";
import { Page } from "../Page";

const songImages = importSongImages() as any;
const linkImages = importLinkImages() as any;
console.log(linkImages)

const licenses = [
  {
    "id": 1,
    "name": "Creative Commons",
    "desc": "This track was released under Creative Commons and can be used in any content where credit is given.",
    "level": 1
  },
  {
    "id": 2,
    "name": "Unofficial Remix",
    "desc": "This track is potentially under strict licensing and unsafe to use in any content, as it is an unofficial remix of a copyrighted song.",
    "level": 3
  },
  {
    "id": 3,
    "name": "Unsafe",
    "desc": "This track was released under a potentially non-content-producer-friendly license and is unsafe for use in any content.",
    "level": 3
  },
  {
    "id": 4,
    "name": "Wolf Beats CC",
    "desc": "This track was released under Creative Commons (or similar) and can be used in any content where credit is given.",
    "info-url": "http://www.wolfbeatsmedia.com/copyright.html",
    "level": 1
  },
  {
    "id": 5,
    "name": "THN License",
    "desc": "This track was released under a potentially non-content-producer-friendly license, but may be safe to use in content under certain circumstances.",
    "info-url": "http://tryhardninja.com/MusicUsageTerms",
    "level": 2
  },
  {
    "id": 6,
    "name": "None",
    "desc": "There is no current license information for this track.",
    "level": 3
  },
  {
    "id": 7,
    "name": "Vital Free Music",
    "desc": "This track was released for free by VitalFM and is safe to use for creative content provided that you give credit to me (the artist). It wouldn't be a bad idea to paste a link to VitalFM's website or Soundcloud, as well. If planning to use for commercial purposes, please contact me first.",
    "level": 1
  }
]

const licenseIcons = [
  {
    "level": 1,
    "class": "fa fa-check-circle text-success"
  },
  {
    "level": 2,
    "class": "fa fa-exclamation-circle text-warning"
  },
  {
    "level": 3,
    "class": "fa fa-skull-crossbones text-danger"
  }
]

const getLicenseIcon = (licenseId: number) => {
  let license = licenses.find(x => x.id === licenseId)!;
  let icon = licenseIcons.find(x => x.level === license.level)!;
  return <i className={`${icon.class} fa-lg `} title={license.desc} />
}

const externalLink = (title: string, url: string, img: string) => url ? <a href={`${url}`} title={`${title}`} target={"_blank"}><img src={linkImages[img]?.default} /></a> : '';
const getItemImage = (item: any) => isNullOrWhitespace(item.imageUrl) ? NoImage : (songImages[item.imageUrl]?.default ?? NoImage);

export const Music = () => {
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
                <a href="<<songurl>>"><img className="image-prop" src={getItemImage(song)} alt={song.title} /></a>

                <div className="mobile-song-info">
                  <h2><a href={song.downloadUrl}>{song.title}</a>{getLicenseIcon(song.licenseId)}</h2>
                  <p>{song.artist}</p>
                </div>
              </td>
              <td className="song-info">
                <a href={song.downloadUrl}>{song.title}</a>
                {getLicenseIcon(song.licenseId)}
              </td>
              <td className="song-info">{song.artist}</td>
              <td className="song-info">{song.genre}</td>
              <td>
                <div className="audio-links">
                  {song.downloadable ? <button className="direct-dl-btn" onClick={() => { }}><img src={linkImages["direct.png"].default} alt="direct" /></button> : null}
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