import { Link, useNavigate } from 'react-router-dom';
import Carousel from '../../components/Carousel';
import { useObservable } from '../../rxjs-functions';
import MusicService from '../../services/music-service';
import { useService } from '../../services/service-resolver';
import { getMusicItemImage } from '../../types/types';
import { Page } from '../Page';
import styles from './HomePage.module.scss'

export const HomePage = () => {
  const musicService = useService(MusicService);
  const songs = useObservable(musicService.Songs);
  const spotlight = JSON.parse(useObservable(musicService.Spotlight)?.songIds || '[]') as number[];
  const nav = useNavigate();
  const spotlightSongs = spotlight.map(x => songs?.find(s => s.id === x));

  return (
    <Page title="Kraedt - Home">
      <h2 className="text-center">I'm back! Miss me?</h2>
      <p className="text-center">I've been working on rewriting this website from scratch, making it more fluid and also less complicated. Songs and downloads may be missing, so in the meantime, please listen on Spotify or YouTube while I'm working on things!</p>
      <div className={styles.bioContainer}>
        <div className={styles.bioText}>
          <p>
            Kraedt (pronounced 'crate') is an electronic music producer from Wisconsin, USA. Since late 2010, he has put together
            a fair number of original tracks and remixes spanning various genres and styles yet maintaining a unique and energetic
            sound. Kraedt's music has been released on a handful of labels, self-released, and some even released under content-creator
            friendly licenses.
          </p>

          <h3 className="text-center">Check out this <Link to="/club1506-interview">interview I did with Club1506</Link>!</h3>

          <h3 className="text-center">Track Spotlight:</h3>
          <div className={styles.trackSpotlight}>
            <Carousel onClickItem={idx => nav(`/music/song/${songs?.find(s => s.id === spotlight[idx])?.title.toLowerCase()}`)}>
              {spotlightSongs.map(s => (
                <div key={s?.id}>
                  <img src={!!s ? getMusicItemImage(s) : ''} alt={s?.title} />
                </div>
              ))
              }
            </Carousel>
          </div>
        </div>

        <div className={styles.verticalDivider}></div>

        <div className={styles.spotifyBlurb + ' text-center'}>
          <h3>A good chunk of my music is now on Spotify!</h3>
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
