import styles from './Footer.module.scss';

export const Footer = () => (
  <footer className={styles.footer}>
    <span>Copyright ©{new Date().getFullYear()} Kraedt - Banner &amp; Logo by <a href="https://www.deviantart.com/karl97" target="_blank" rel='noreferrer'>Karl97</a></span>
  </footer>
)