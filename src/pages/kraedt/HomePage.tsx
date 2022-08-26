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
  console.log(spotlightSongs)

  return (
    <Page title="Kraedt - Home">
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
          {/*% include spotify-follow.jekyll %*/}

          <br />
          <br />
          <h3>Latest Release:</h3>
          {//<iframe src="{{site.latest-spotify}}" width="290" height="380" frameBorder="0" allowTransparency={true} allow="encrypted-media"></iframe>
          }
        </div>
      </div >
    </Page >
  )
};
