import { Link } from 'react-router-dom';
import { useObservable } from '../../rxjs-functions';
import MusicService from '../../services/music-service';
import { useService } from '../../services/service-resolver';
import { Song } from '../../types/types';
import { Page } from '../Page';
import styles from './KraedtHome.module.scss'
import './Kraedt.scss';

export const KraedtHome = () => {
  const musicService = useService(MusicService);
  const songs = useObservable(musicService.Songs);
  const spotlight = JSON.parse(useObservable(musicService.Spotlight)?.songIds || '[]') as number[];
  const spotlightSongs = spotlight.map(x => songs?.find(s => s.id === x)).filter(x => !!x) as Song[];

  return (
    <Page title="Kraedt - Home">
      <div className={styles.bioContainer}>
        <div className={styles.bioText}>
          <p>
            Kraedt was an electronic music producer known for a genre-spanning catalog built over more than a decade. 
            With standout tracks like "Isometric", "Pyromania", "You Can Find It", "From The Dark", and the high-energy remix of "Revenge" (with TryHardNinja and CaptainSparklez).
          </p>
          <p>
            Known also for soundtrack contributions to "Robot Roller-Derby: Disco Dodgeball", "Formula Fusion", and other successful collaborations with TryHardNinja, 
            Kraedt explored high-energy house, melodic drum and bass, and genre-experimental sounds.
          </p>
          <p>
            As the music evolved, so did the artist - and going forward, all new releases will appear under a new name: Vessra.
          </p>
          <p>
            Vessra represents a more vocal-forward chapter in the same creative journey.
          </p>

          <h3 className="text-center"><Link to="/" reloadDocument>Listen to Vessra</Link></h3>
        </div>

        <div className={styles.verticalDivider}></div>

        <div className={styles.spotifyBlurb + ' text-center'}>
          <h3>Listen to Kraedt on Spotify</h3>
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
