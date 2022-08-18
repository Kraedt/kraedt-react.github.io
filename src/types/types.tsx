import noImage from '../assets/images/no-image.jpg'
import { isNullOrWhitespace } from "../functions";
import { importLinkImages, importSongImages } from "../helpers";

export interface Song {
  id: number;
  downloadUrl: string;
  title: string;
  artist: string;
  genre: string;
  imageUrl: string;
  buyable: boolean;
  downloadable: boolean;
  youtubeId: string;
  itunesUrl: string;
  beatportUrl: string;
  amazonUrl: string;
  spotifyUrl: string;
  licenseId: number;
}

export const getSongIdentifier = (song?: Song) => song?.title?.toLowerCase();
//export const getSongIdentifier = (song: Song) => `${song.artist}-${song.title}`;

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

const songImages = importSongImages() as any;
const linkImages = importLinkImages() as any;

export const getLicenseIcon = (licenseId: number) => {
  let license = licenses.find(x => x.id === licenseId)!;
  let icon = licenseIcons.find(x => x.level === license.level)!;
  return <i className={`${icon.class} fa-lg `} title={license.desc} />
}

export const NoImage = noImage;
export const DirectDownloadImage = linkImages["direct.png"].default;

export const externalLink = (title: string, url: string, img: string) => url ? <a href={`${url}`} title={`${title}`} target={"_blank"} rel='noreferrer' > <img src={linkImages[img]?.default} alt='img' /> </a> : '';
export const getMusicItemImage = (item: any) => isNullOrWhitespace(item.imageUrl) ? NoImage : (songImages[item.imageUrl]?.default ?? NoImage);