import styles from './LoadingSpinner.module.scss';

type Size = 'sm' | 'med' | 'lg' | 'xl';

interface Props {
  size?: Size;
}

export const LoadingSpinner = ({ size = 'med' }: Props) => {
  const sizes = {
    'sm': styles.sm,
    'med': styles.med,
    'lg': styles.lg,
    'xl': styles.xl
  }

  return (
    <i className={`${styles.loadingSpinner} ${sizes[size]} fa fa-spinner`}></i>
  )
}