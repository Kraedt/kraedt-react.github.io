import styles from './Header.module.scss';
import soundcloudIcon from '../../assets/images/soundcloud_icon.png';
import youtubeIcon from '../../assets/images/youtube_icon.png';
import spotifyIcon from '../../assets/images/spotify_icon.png';
import sbbLogo from '../../assets/images/sbb-logo.png';
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
    <ListLink url="/sonicbreakbeat" className={showActive('/sonicbreakbeat')} text="HOME" />
    <ListLink url="/sonicbreakbeat/music" className={showActiveContains('/sonicbreakbeat/music')} text="MUSIC" />
    <ListLink url="/sonicbreakbeat/contact" className={showActive('/sonicbreakbeat/contact')} text="CONTACT" />
    <li className={styles.br} />
    <ListLinkIcon url="http://soundcloud.com/sonic-breakbeat" img={soundcloudIcon} title="Soundcloud" alt="soundcloud" />
    <ListLinkIcon url="https://www.youtube.com/channel/UCTka0pW1wYjz0bNtQLKrnzQ" img={youtubeIcon} title="YouTube" alt="youtube" />
    <ListLinkIcon url="https://open.spotify.com/artist/0m9IWmce1vXWxxnJmkUpDc" img={spotifyIcon} title="Spotify" alt="spotify" />
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
          <img src={sbbLogo} alt="sonic breakbeat logo" />
        </div>
      </div>
    </div >
  )
}