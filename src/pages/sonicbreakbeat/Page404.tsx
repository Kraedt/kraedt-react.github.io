import { Link } from 'react-router-dom';
import { Page } from '../Page';
import styles from './Page404.module.scss';

export const Page404 = () => (
  <Page title="Sonic Breakbeat - 404">
    <div className={styles.container}>
      <h1>SBB says: 404</h1>

      <p><strong>Page not found :(</strong></p>
      <p>Looking for a song? Click <Link to="/music/">here</Link>.</p>
    </div>
  </Page>
)