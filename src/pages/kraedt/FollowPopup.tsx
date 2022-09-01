import styles from './FollowPopup.module.scss';
import { Modal } from "../../components/Modal";
import InteractService, { shouldShowFollowPopupKey } from "../../services/interact-service"
import { useService } from "../../services/service-resolver"
import soundcloudFollowImg from "../../assets/images/follow-soundcloud.png";

export const FollowPopup = () => {
  const interactService = useService(InteractService);

  return (
    <Modal onClose={() => interactService.Intents.ShowModal.next('none')}>
      <div className={styles.followPopup}>
        <h3>If you enjoy my music, please take the time to give me a follow on my main platforms!</h3>
        <p>Thank you!</p>
        <table className={styles.followPopupTable}>
          <tbody>
            <tr>
              <td><h3>Spotify:</h3></td>
              <td>
                <a href='https://open.spotify.com/artist/0YbhxZi9PSVTmB4UMkM5Jw?si=W1wUzB3RT2CJiL9xniFgOg'>Follow on Spotify</a>
              </td>
            </tr>
            <tr>
              <td><h3>Youtube:</h3></td>
              <td>
                <div className="g-ytsubscribe" data-channel="kraedt" data-layout="full" data-theme="dark" data-count="default"></div>
              </td>
            </tr>
            <tr>
              <td><h3>Soundcloud:</h3></td>
              <td>
                <a className={styles.followBtn} href="http://soundcloud.com/kraedt" target="_blank" rel="noreferrer"><img alt='soundcloud' src={soundcloudFollowImg} /></a>
              </td>
            </tr>
            <tr>
              <td><h3>Twitter:</h3></td>
              <td>
                <a href="https://twitter.com/kraedt?ref_src=twsrc%5Etfw"
                  className="twitter-follow-button"
                  data-show-count="true">Follow @kraedt</a>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <h2><button className='icon-button' onClick={() => { localStorage.setItem(shouldShowFollowPopupKey, 'false'); interactService.Intents.ShowModal.next('none') }}>Don't show this again</button></h2>
      </div>
    </Modal>
  )
}