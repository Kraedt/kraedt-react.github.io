import { Page } from '../Page';
import styles from './Merch.module.scss';

export const Merch = () => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://shop.spreadshirt.com/shopfiles/shopclient/shopclient.nocache.js";
  script.async = true;
  document.body.appendChild(script);

  return (
    <Page title="Kraedt">
      <br />
      <div id="kraedt-merch" className={styles.merch}>
        <a href="https://shop.spreadshirt.com/kraedt-merch">kraedt</a>
      </div>
    </Page>
  )
}