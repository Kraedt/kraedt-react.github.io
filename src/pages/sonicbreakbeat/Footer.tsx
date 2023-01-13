import styles from './Footer.module.scss';

export const Footer = () => (
  <footer className={styles.footer}>
    <span>Copyright ©{new Date().getFullYear()} Sonic Breakbeat - Logo by <a href="https://www.deviantart.com/vexx3" target="_blank" rel='noreferrer'>Vexx3</a> &amp; Avatar by <a href="https://www.furaffinity.net/gallery/mscootaloo/" target="_blank" rel='noreferrer'>mscootaloo</a></span>
  </footer>
)