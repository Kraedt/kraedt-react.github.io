import { Link } from 'react-router-dom';
import { SongCarousel } from '../../components/SongCarousel';
import { useObservable } from '../../rxjs-functions';
import MusicService from '../../services/music-service';
import { useService } from '../../services/service-resolver';
import { Alias, Song } from '../../types/types';
import { Page } from '../Page';
import styles from './VessraHome.module.scss'
import './Vessra.scss';
import logo from '../../assets/images/vessra-logo.png';

export const VessraHome = () => {
  const musicService = useService(MusicService);
  const songs = useObservable(musicService.Songs);
  const spotlight = JSON.parse(useObservable(musicService.Spotlight)?.songIds || '[]') as number[];
  const spotlightSongs = spotlight.map(x => songs?.find(s => s.id === x)).filter(x => !!x) as Song[];

  return (
    <Page title="Vessra - Home">
      <div className={styles.background}></div>
      <div className={styles.bioContainer}>
        <img className={styles.bioLogo} src={logo} alt='Vessra Logo'/>
        <div className={styles.bioText + ' text-center'}>
          <p>
            Vessra is an electronic music artist and producer from Wisconsin, USA. Since 2010 (under earlier aliases like <a href="/kraedt">Kraedt</a>), 
            she has created a wide range of original tracks and remixes spanning genres like house, drum and bass, and melodic electronica - all while 
            maintaining a unique and energetic sound. As Vessra, she focuses on blending expressive vocals with familiar instrumental styles, creating music 
            that sounds great and sticks with listeners. She also aims to release music that is not only artistically crafted, but also usable in creative 
            content through content-creator-friendly licenses.
          </p>

          {/*<SongCarousel alias={Alias.Vessra} allSongs={songs} carouselSongs={spotlightSongs} />*/}
        </div>

        <div className={styles.spotifyBlurb + ' text-center'}>
          <h3>Follow me on Spotify!</h3>
          <iframe
            style={{ borderRadius: '12px' }}
            title="spotify"
            src="https://open.spotify.com/embed/artist/0qSthKMZKXeidXq6zgKzIn?utm_source=generator"
            width="40%"
            height="400"
            frameBorder="0"
            allowFullScreen={false}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        </div>
      </div >
    </Page >
  )
};
