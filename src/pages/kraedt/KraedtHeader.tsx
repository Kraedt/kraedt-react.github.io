import styles from './KraedtHeader.module.scss';
import soundcloudIcon from '../../assets/images/soundcloud_icon.png';
import youtubeIcon from '../../assets/images/youtube_icon.png';
import spotifyIcon from '../../assets/images/spotify_icon.png';
import beatportIcon from '../../assets/images/beatport_icon.png';
//import twitterIcon from '../../assets/images/twitter_icon.png';
import kraedtLogo from '../../assets/images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export const KraedtHeader = () => {
  const url = useLocation().pathname;
  const [navOpen, setNavOpen] = useState(false);

  const showActive = (urlMatch: string) => url === urlMatch ? styles.active : '';
  const showActiveContains = (urlMatch: string) => url.includes(urlMatch) ? styles.active : '';

  const ListLinkIcon = ({ url, img, title, alt }: { url: string, img: string, title: string, alt: string }) => (
    <li className={styles.sm}>
      <a href={url} title={title} target="_blank" rel="noreferrer">
        <img src={img} alt={alt} />
      </a>
    </li>
  )

  const ListLink = ({ url, className, text, reload }: { url: string, className: string, text: string, reload: boolean }) => (
    <li className={styles.text}><Link to={url} className={className} reloadDocument={reload}>{text}</Link></li>
  )

  //<ListLink url="/merch" className={showActive('/merch')} text="MERCH" />
  const links = <>
    <ListLink url="/" className={showActive('/')} text="AKA VESSRA" reload={true}/>
    <ListLink url="/kraedt/music" className={showActiveContains('/music')} text="MUSIC" reload={false}/>
    {/*<ListLinkIcon url="http://twitter.com/kraedt" img={twitterIcon} title="Twitter" alt="twitter" />*/}
  </>

  return (
    <div className={styles.header}>
      <div className={styles.navbarBg} />
      <div className={styles.mobileNavbar} id="nav">
        <ul className={styles.links} style={{ display: navOpen ? 'initial' : 'none' }}>
          {links}
        </ul>
        <button className={styles.icon + ' icon-button'} onClick={() => setNavOpen(!navOpen)}>&#9776;</button>
      </div>
      <div className={styles.navbar} id="nav">
        <ul className={styles.links}>
          {links}
        </ul>
      </div>
      <div className={styles.banner}>
        <div className={styles.logo}>
          <img src={kraedtLogo} alt="kraedt logo" />
        </div>
      </div>
    </div >
  )
}