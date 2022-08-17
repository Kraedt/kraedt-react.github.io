import { useObservable } from "../rxjs-functions";
import { useService } from "../services/service-resolver"
import ToastService from "../services/toast-service";
import styles from './ToastPanel.module.scss'

export const ToastPanel = () => {
  const toastService = useService(ToastService);
  const errors = useObservable(toastService.Errors);

  return (
    <div className={styles.panel}>
      {errors?.map((e, i) => (
        <div key={i} className={`${styles.item} ${styles.error}`}>
          {e}
        </div>
      ))}
    </div>
  )
}