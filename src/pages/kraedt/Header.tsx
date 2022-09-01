import styles from './Header.module.scss';
import soundcloudIcon from '../../assets/images/soundcloud_icon.png';
import youtubeIcon from '../../assets/images/youtube_icon.png';
import spotifyIcon from '../../assets/images/spotify_icon.png';
import beatportIcon from '../../assets/images/beatport_icon.png';
import twitterIcon from '../../assets/images/twitter_icon.png';
import kraedtLogo from '../../assets/images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export const Header = () => {
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

  const ListLink = ({ url, className, text }: { url: string, className: string, text: string }) => (
    <li className={styles.text}><Link to={url} className={className}>{text}</Link></li>
  )

  const links = <>
    <ListLink url="/" className={showActive('/')} text="HOME" />
    <ListLink url="/music" className={showActiveContains('/music')} text="MUSIC" />
    <ListLink url="/merch" className={showActive('/merch')} text="MERCH" />
    <ListLink url="/contact" className={showActive('/contact')} text="CONTACT" />
    <li className={styles.br} />
    <ListLinkIcon url="http://soundcloud.com/kraedt" img={soundcloudIcon} title="Soundcloud" alt="soundcloud" />
    <ListLinkIcon url="http://youtube.com/kraedt" img={youtubeIcon} title="YouTube" alt="youtube" />
    <ListLinkIcon url="https://open.spotify.com/artist/0YbhxZi9PSVTmB4UMkM5Jw" img={spotifyIcon} title="Spotify" alt="spotify" />
    <ListLinkIcon url="https://beatport.com/artist/kraedt/429462" img={beatportIcon} title="Beatport" alt="beatport" />
    <ListLinkIcon url="http://twitter.com/kraedt" img={twitterIcon} title="Twitter" alt="twitter" />
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