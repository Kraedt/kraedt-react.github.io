import styles from './Panel.module.scss'

interface Props {
  header?: string;
  children?: any;
}

export const Panel = (props: Props) => {
  let { children, header } = props;

  return (
    <section className={styles.panel}>
      {header && <><h2>{header}</h2><hr /></>}
      <p>{children}</p>
    </section>
  )
}