import { Link } from 'react-router-dom';
import { SongCarousel } from '../../components/SongCarousel';
import { useObservable } from '../../rxjs-functions';
import MusicService from '../../services/music-service';
import { useService } from '../../services/service-resolver';
import { Alias, Song } from '../../types/types';
import { Page } from '../Page';
import styles from './HomePage.module.scss'
import './Kraedt.scss';

export const HomePage = () => {
  const musicService = useService(MusicService);
  const songs = useObservable(musicService.Songs);
  const spotlight = JSON.parse(useObservable(musicService.Spotlight)?.songIds || '[]') as number[];
  const spotlightSongs = spotlight.map(x => songs?.find(s => s.id === x)).filter(x => !!x) as Song[];

  return (
    <Page title="Kraedt - Home">
      <div className={styles.bioContainer}>
        <div className={styles.bioText}>
          <p>
            Valorie Schwartz, better known by her stage name Kraedt (pronounced "crate"), is an electronic music producer hailing from Wisconsin, USA. 
            Since 2010, Kraedt has crafted a diverse catalog of original tracks and remixes, blending a variety of genres while maintaining a distinct, 
            energetic sound. Her music has been released through various labels, independently, and many tracks have been made available under content-creator-friendly licenses.
          </p>

          <h3 className="text-center">Check out this <Link to="/club1506-interview">interview I did with Club1506</Link>!</h3>

          <SongCarousel alias={Alias.Kraedt} allSongs={songs} carouselSongs={spotlightSongs} />
        </div>

        <div className={styles.verticalDivider}></div>

        <div className={styles.spotifyBlurb + ' text-center'}>
          <h3>Follow me on Spotify!</h3>
          <iframe
            style={{ borderRadius: '12px' }}
            title="spotify"
            src="https://open.spotify.com/embed/artist/0YbhxZi9PSVTmB4UMkM5Jw?utm_source=generator"
            width="80%"
            height="400"
            frameBorder="0"
            allowFullScreen={false}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        </div>
      </div >
    </Page >
  )
};
