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
            Vessra is a vocal-driven electronic artist blending atmospheric textures with emotive rhythm. Drawing from over a decade of experience, 
            she weaves elements of house, drum and bass, and introspective pop into a sound that feels both ethereal and grounded. With a focus on melody, 
            emotion, and voice, Vessra creates music that resonates beyond the dancefloor - intimate, immersive, and unmistakably her own.
          </p>

          {/*<SongCarousel alias={Alias.Vessra} allSongs={songs} carouselSongs={spotlightSongs} />*/}
        </div>

        <div className={styles.spotifyBlurb + ' text-center'}>
          <h3>Spotify coming soon!</h3>
          {/*
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
            */}
        </div>
      </div >
    </Page >
  )
};
