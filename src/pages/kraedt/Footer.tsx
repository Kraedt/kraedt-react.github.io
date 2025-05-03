import styles from './Footer.module.scss';

export const Footer = () => (
  <footer className={styles.footer}>
    <span>Copyright ©{new Date().getFullYear()} Kraedt - Banner &amp; Logo by <a href="https://www.behance.net/Kinetic-arts" target="_blank" rel='noreferrer'>Floris Vogelpoel</a></span>
  </footer>
)