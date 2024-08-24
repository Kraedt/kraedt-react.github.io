import { Link } from 'react-router-dom';
import { SongCarousel } from '../../components/SongCarousel';
import { useObservable } from '../../rxjs-functions';
import MusicService from '../../services/music-service';
import { useService } from '../../services/service-resolver';
import { Alias, Song } from '../../types/types';
import { Page } from '../Page';
import styles from './HomePage.module.scss'
import './Sbb.scss';

export const HomePage = () => {
  const musicService = useService(MusicService);
  const songs = useObservable(musicService.Songs);
  const spotlight = JSON.parse(useObservable(musicService.Spotlight)?.songIds || '[]') as number[];
  const spotlightSongs = spotlight.map(x => songs?.find(s => s.id === x)).filter(x => !!x) as Song[];

  return (
    <Page title="Sonic Breakbeat - Home">
      <div className={styles.bioContainer}>
        <div className={styles.bioText}>
          <p>
            Sonic Breakbeat is an ex-brony musician from Wisconsin, USA who produces Progressive House, Drum n' Bass and other genres of Electronic Dance Music.
            Her previous works include remixes of other brony musicians, original music using vocal clips from My Little Pony: Friendship is Magic and original music that is instrumental.
          </p>
          <p>
            With a revival of the alias, Sonic Breakbeat's newer works feature a mix of familiar and newer styles, combined with higher production quality and themes detached from MLP:FiM.
          </p>
          <p>
            Her name "Sonic Breakbeat" is portmanteau of "Sonic Rainboom", an stunt that Rainbow Dash from My Little Pony: Friendship is Magic is able to pull, and "Breakbeat", a word describing a broken drum break within songs of Jungle or Drum n' Bass genre, but more widely known as a musical genre.
          </p>
          <Link to='explanation'>What happened to Sonic Breakbeat?</Link>
          <SongCarousel alias={Alias.Sbb} allSongs={songs} carouselSongs={spotlightSongs} />
        </div>
        <div className={styles.verticalDivider}></div>
        <div className={styles.spotifyBlurb + ' text-center'}>
          <h3>Follow me on Spotify!</h3>
          <iframe
            style={{ borderRadius: '12px' }}
            title="spotify"
            src="https://open.spotify.com/embed/artist/0m9IWmce1vXWxxnJmkUpDc?utm_source=generator&theme=0"
            width="80%"
            height="400"
            frameBorder="0"
            allowFullScreen={false}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        </div>
      </div >
    </Page>
  )
};
