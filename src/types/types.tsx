import noImage from '../assets/images/no-image.jpg'
import { isNullOrWhitespace } from "../functions";
import { importLinkImages, importSongImages } from "../helpers";

export interface Song {
  id: number;
  title: string;
  artist: string;
  genre: string;
  imageUrl?: string;
  buyable?: boolean;
  downloadable?: boolean;
  downloadUrl?: string;
  youtubeId?: string;
  itunesUrl?: string;
  beatportUrl?: string;
  amazonUrl?: string;
  spotifyUrl?: string;
  licenseId: number;
}

export interface Album {
  id: number;
  title: string;
  songs: string;
  imageUrl?: string;
  buyable?: boolean;
  downloadable?: boolean;
  itunesUrl?: string;
  beatportUrl?: string;
  amazonUrl?: string;
  spotifyUrl?: string;
}

export interface Spotlight {
  songIds: string;
}

export const getSongIdentifier = (song?: Song) => song?.title?.toLowerCase();

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
    "infoUrl": "http://www.wolfbeatsmedia.com/copyright.html",
    "level": 1
  },
  {
    "id": 5,
    "name": "THN License",
    "desc": "This track was released under a potentially non-content-producer-friendly license, but may be safe to use in content under certain circumstances.",
    "infoUrl": "http://tryhardninja.com/MusicUsageTerms",
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

const songImages = importSongImages() as any;
export const linkImages = importLinkImages() as any;

export const getLicense = (licenseId: number) => {
  return licenses.find(x => x.id === licenseId)!;
}

export const getLicenseIcon = (licenseId: number) => {
  let license = getLicense(licenseId);
  let icon = licenseIcons.find(x => x.level === license.level)!;
  return <i className={`${icon.class} fa-lg `} title={license.desc} />
}

export const getLicenseToolTip = () => {
  return licenses.reduce((l, r) => l + `* ${r.id} ${r.name} (level ${r.level}${!!r.infoUrl ? ', has info' : ''}) - ${r.desc}\r\n\r\n`, '')
}

export const NoImage = noImage;
export const DirectDownloadImage = linkImages["direct.png"].default;
export const YoutubeLinkImage = linkImages["youtube.png"].default;

export const externalLink = (title: string, url?: string, img?: string) => url ? <a href={`${url}`} title={`${title}`} target={"_blank"} rel='noreferrer' > <img src={linkImages[img ?? '']?.default} alt='img' /> </a> : '';
export const getMusicItemImage = (item: any) => isNullOrWhitespace(item.imageUrl) ? NoImage : (songImages[item.imageUrl]?.default ?? NoImage);

export const DirectDownloadLink = (songId: number, downloadable?: boolean) => downloadable && <button className="direct-dl-btn" onClick={() => { }}><img src={DirectDownloadImage} alt="direct" /></button>
export const SpotifyLink = (url?: string) => externalLink('Spotify', url, 'spotify.png')
export const ItunesLink = (url?: string) => externalLink('iTunes', url, 'itunes.png')
export const BeatportLink = (url?: string) => externalLink('Beatport', url, 'beatport.png')
export const AmazonLink = (url?: string) => externalLink('Amazon', url, 'amazon.png')