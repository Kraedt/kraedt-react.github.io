
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