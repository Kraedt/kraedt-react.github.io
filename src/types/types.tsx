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
  year?: number;
  licenseId: number;
}

export interface Album {
  id: number;
  title: string;
  songIds: string;
  imageUrl?: string;
  buyable?: boolean;
  downloadable?: boolean;
  itunesUrl?: string;
  beatportUrl?: string;
  amazonUrl?: string;
  spotifyUrl?: string;
  year?: number;
}

export interface ArtistData {
  songs: Song[],
  albums: Album[]
  spotlight: Spotlight
}

export interface Spotlight {
  songIds: string;
}

export interface ContactMessage {
  clientId: string;
  name: string;
  message: string;
}

export enum Alias {
  Kraedt,
  Sbb
}

export const getAliasName = (a: Alias) => ["Kraedt", "Sonic Breakbeat"][a];
export const getAliasKey = (a: Alias) => ["kraedt", "sonicbreakbeat"][a];
export const getPathPrefix = (a: Alias) => ["", "/sonicbreakbeat"][a];

export const getMusicPageName = (item?: Song | Album) => item?.title.toLowerCase().replaceAll(' ', '-').replaceAll('(', '').replaceAll(')', '').replaceAll("/", "");

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
    "class": "fa fa-check-circle text-positive"
  },
  {
    "level": 2,
    "class": "fa fa-exclamation-circle text-warning"
  },
  {
    "level": 3,
    "class": "fa fa-skull-crossbones text-negative"
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
export const DirectDownloadImage = linkImages["direct.png"];
export const YoutubeLinkImage = linkImages["youtube.png"];

export const externalLink = (title: string, url?: string, img?: string) => {
  return url ? <a href={`${url}`} title={`${title}`} target={"_blank"} rel='noreferrer' ><img src={linkImages[img ?? '']} alt='img' /></a> : '';
}

const convertDriveUrlToId = (rawUrl: string) => rawUrl.substring(rawUrl.search("id="), rawUrl.search("&")).slice(3);
export const getDriveFile = (url: string) => `https://drive.google.com/uc?export=view&id=${url.startsWith("http") ? convertDriveUrlToId(url) : url}`;
export const getDriveDirectDownload = (url: string) => `https://drive.google.com/uc?export=download&id=${url.startsWith("http") ? convertDriveUrlToId(url) : url}`;
export const getMusicItemImage = (item: any) => item.imageUrl?.startsWith("http") ? getDriveFile(item.imageUrl) : (isNullOrWhitespace(item.imageUrl) ? NoImage : (songImages[item.imageUrl] ?? getDriveFile(item.imageUrl)));

export const SpotifyLink = (url?: string) => externalLink('Spotify', url, 'spotify.png')
export const ItunesLink = (url?: string) => externalLink('iTunes', url, 'itunes.png')
export const BeatportLink = (url?: string) => externalLink('Beatport', url, 'beatport.png')
export const AmazonLink = (url?: string) => externalLink('Amazon', url, 'amazon.png')

export const DirectDownloadLink = (url?: string, downloadable?: boolean) => downloadable && !!url && <a className="direct-dl-btn" href={getDriveDirectDownload(url)}><img src={DirectDownloadImage} alt="direct-download" /></a>