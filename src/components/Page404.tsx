import { Link } from 'react-router-dom';
import styles from './Page404.module.scss';
import { Page } from '../pages/Page';
import { Alias, getAliasName, getPathPrefix } from '../types/types';

export const Page404 = () => {
  const aliasFromLocation = window.location.pathname.split('/')[1]

  let alias = Alias.Vessra;

  switch (aliasFromLocation) {
    case "kraedt":
      alias = Alias.Kraedt;
      break;
    case "sonicbreakbeat":
      alias = Alias.Sbb;
      break;
  }

  return (
    <Page title={`${getAliasName(alias)} - 404`}>
      <div className={styles.container}>
        <h1>404</h1>

        <p><strong>Page not found :(</strong></p>
        <p>Looking for a song? Click <Link to={`${getPathPrefix(alias)}/music/`}>here</Link>.</p>
      </div>
    </Page >
  )
}