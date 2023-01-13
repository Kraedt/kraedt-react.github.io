import styles from './Footer.module.scss';

export const Footer = () => (
  <footer className={styles.footer}>
    <span>Copyright ©{new Date().getFullYear()} Kraedt - Banner &amp; Logo by <a href="http://kinetic-gfx.tumblr.com/" target="_blank" rel='noreferrer'>Kinetic Arts</a></span>
  </footer>
)