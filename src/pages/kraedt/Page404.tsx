import { Link } from 'react-router-dom';
import { Alias, getAliasName, getPathPrefix } from '../../types/types';
import { Page } from '../Page';
import styles from './Page404.module.scss';

export const Page404 = () => {
  const aliasFromLocation = window.location.pathname.split('/')[1]
  const alias = aliasFromLocation.toLowerCase() === "sonicbreakbeat" ? Alias.Sbb : Alias.Kraedt;

  return (
    < Page title={`${getAliasName(alias)} - 404`}>
      <div className={styles.container}>
        <h1>404</h1>

        <p><strong>Page not found :(</strong></p>
        <p>Looking for a song? Click <Link to={`${getPathPrefix(alias)}/music/`}>here</Link>.</p>
      </div>
    </Page >
  )
}