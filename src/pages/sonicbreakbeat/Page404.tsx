import { Link } from 'react-router-dom';
import { Page } from '../Page';
import styles from './Page404.module.scss';

export const Page404 = () => (
  <Page title="Sonic Breakbeat - 404">
    <div className={styles.container}>
      <p><strong>Page not found :(</strong></p>
      <p>Looking for a song? Click <Link to="/sonicbreakeat/music/">here</Link>.</p>
    </div>
  </Page>
)