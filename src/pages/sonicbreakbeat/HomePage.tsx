import { Page } from '../Page';
import styles from './HomePage.module.scss'
import './Sbb.scss';

export const HomePage = () => {
  //const musicService = useService(MusicService);
  //const songs = useObservable(musicService.Songs);
  //const spotlight = JSON.parse(useObservable(musicService.Spotlight)?.songIds || '[]') as number[];
  //const spotlightSongs = spotlight.map(x => songs?.find(s => s.id === x)).filter(x => !!x) as Song[];

  return (
    <Page title="Sonic Breakbeat - Home">
      <div className={styles.bioContainer}>
        <div className={styles.bioText}>
          <p>
            Sonic Breakbeat is an ex-brony musician from Wisconsin, USA who produces Progressive House, Drum n' Bass and other genres of Electronic Dance Music.
            His previous works include remixes of other brony musicians, original music using vocal clips from My Little Pony: Friendship is Magic and original music that is instrumental.
          </p>
          <p>
            With a revival of the alias, Sonic Breakbeat's newer works feature a mix of familiar and newer styles, combined with higher production quality and themes detached from MLP:FiM.
          </p>
          <p>
            His name "Sonic Breakbeat" is portmanteau of "Sonic Rainboom", an stunt that Rainbow Dash from My Little Pony: Friendship is Magic is able to pull, and "Breakbeat", a word describing a broken drum break within songs of Jungle or Drum n' Bass genre, but more widely known as a musical genre.
          </p>
        </div>
        <div className={styles.verticalDivider}></div>
        <div className={styles.bioText}>
          <p>
            Welcome to the new website! This acts as an archive for now, but maybe there will be new Sonic Breakbeat music in the future? 👀
          </p>
        </div>
      </div >
    </Page>
  )
};
