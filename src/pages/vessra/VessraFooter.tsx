import styles from './VessraFooter.module.scss';

export const VessraFooter = () => (
  <footer className={styles.footer}>
    <span>Copyright ©{new Date().getFullYear()} Vessra</span>
  </footer>
)