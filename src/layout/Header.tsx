import styles from './Header.module.scss';
import soundcloudIcon from '../assets/images/soundcloud_icon.png';
import youtubeIcon from '../assets/images/youtube_icon.png';
import spotifyIcon from '../assets/images/spotify_icon.png';
import beatportIcon from '../assets/images/beatport_icon.png';
import twitterIcon from '../assets/images/twitter_icon.png';
import kraedtLogo from '../assets/images/logo.png';

export const Header = () => {
  let responsiveNav = () => {
    var x = document.getElementById("nav")!;
    x.className = x.className === styles.navbar
      ? styles.navbar + ' ' + styles.responsive
      : styles.navbar;
  }

  let page = { url: 'null' }
  const showActive = (urlMatch: string) => page.url === urlMatch ? 'active' : '';
  const showActiveContains = (urlMatch: string) => page.url.includes(urlMatch) ? 'active' : '';

  const LinkIcon = ({ url, img, title, alt }: { url: string, img: string, title: string, alt: string }) => (
    <li className={styles.sm}>
      <a href={url} title={title} target="_blank" rel="noreferrer">
        <img src={img} alt={alt} />
      </a>
    </li>
  )

  const Link = ({ url, className, text }: { url: string, className: string, text: string }) => (
    <li className={styles.text}><a href={url} className={className}>{text}</a></li>
  )

  return (
    <div className={styles.header}>
      <div className={styles.navbarBg}></div>
      <div className={styles.navbar} id="nav">
        <ul className={styles.links}>
          <Link url="/" className={showActive('/')} text="HOME" />
          <li><a href="/music" className={showActiveContains('/music/')}>MUSIC</a></li>
          <li><a href="/merch" className={showActive('/merch/')}>MERCH</a></li>
          <li><a href="/contact" className={showActive('/contact/')}>CONTACT</a></li>
          <li className={styles.br} />
          <LinkIcon url="http://soundcloud.com/kraedt" img={soundcloudIcon} title="Soundcloud" alt="soundcloud" />
          <LinkIcon url="http://youtube.com/kraedt" img={youtubeIcon} title="YouTube" alt="youtube" />
          <LinkIcon url="https://open.spotify.com/artist/0YbhxZi9PSVTmB4UMkM5Jw" img={spotifyIcon} title="Spotify" alt="spotify" />
          <LinkIcon url="https://pro.beatport.com/artist/kraedt/429462" img={beatportIcon} title="Beatport" alt="beatport" />
          <LinkIcon url="http://twitter.com/kraedt" img={twitterIcon} title="Twitter" alt="twitter" />
          {/* todo: make button - <a href="javascript:void(0);" className={styles.icon} onClick={() => responsiveNav()}>&#9776;</a> */}
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