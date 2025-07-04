import styles from './VessraHeader.module.scss';
import vessraLogo from '../../assets/images/vessra-logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import butterfly from '../../assets/images/butterfly.png';

export const VessraHeader = () => {
  const url = useLocation().pathname;
  const [navOpen, setNavOpen] = useState(false);

  const showActive = (urlMatch: string) => url === urlMatch ? styles.active : '';
  const showActiveContains = (urlMatch: string) => url.includes(urlMatch) ? styles.active : '';

  const ListLinkIcon = ({ url, icon, title }: { url: string, icon: string, title: string }) => (
    <li className={styles.sm}>
      <a href={url} title={title} target="_blank" rel="noreferrer">
        <i className={'fa '+icon}/>
      </a>
    </li>
  )

  const ListLink = ({ url, className, text, img }: { url: string, className: string, text: string, img?: string }) => (
    <li className={styles.text}>
      {img && <img className={styles.linkImage} src={img}/>}
      <Link to={url} className={className}>{text}</Link>
    </li>
  )

  const links = <>
    <ListLink url="/" className={showActive('/')} text="HOME" img={butterfly} />
    <ListLink url="/music" className={showActiveContains('/music')} text="MUSIC" />
    {/*<ListLink url="/merch" className={showActive('/merch')} text="MERCH" />*/}
    <ListLink url="/about" className={showActive('/about')} text="ABOUT" />
    <ListLink url="/contact" className={showActive('/contact')} text="CONTACT" />
    <li className={styles.br} />
    <ListLinkIcon url="http://soundcloud.com/vessra" icon='fa-soundcloud' title="Soundcloud" />
    <ListLinkIcon url="http://youtube.com/@Vessra" icon='fa-youtube' title="YouTube" />
    <ListLinkIcon url="https://open.spotify.com/artist/0qSthKMZKXeidXq6zgKzIn" icon='fa-spotify' title="Spotify" />
    <ListLinkIcon url="https://bsky.app/profile/vessramusic.bsky.social" icon='fa-brands fa-bluesky' title="Bluesky" />
    {/*<ListLinkIcon url="https://beatport.com/artist/kraedt/429462" img={beatportIcon} title="Beatport" alt="beatport" />*/}
  </>

  const header = url === "/" 
    ? <></> : 
      <div className={styles.banner}>
        <div className={styles.logo}>
          <img src={vessraLogo} alt="vessra logo" />
        </div>
      </div>

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
      {header}
    </div>
  )
}