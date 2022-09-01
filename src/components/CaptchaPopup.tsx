import InteractService from "../services/interact-service";
import { useService } from "../services/service-resolver";
import noRobotsImage from "../assets/images/norobots.jpg";
import ReCAPTCHA from "react-google-recaptcha";
import { useCallback } from "react";
import { getClientId } from "../functions";
import ToastService from "../services/toast-service";
import { Modal } from "./Modal";

export const CaptchaPopup = () => {
  const interactService = useService(InteractService);
  const toastService = useService(ToastService);

  const devSecret = "6LfUd4gUAAAAAPSaalhetzFMPD-rflobF69-FxDS";
  const prodSecret = "6LePdYgUAAAAAHtrf48MGpVTLTUERCj1h6296ynv";

  var key = document.location.hostname === "localhost" || document.location.hostname === "127.0.0.1"
    ? devSecret
    : prodSecret;

  /*
  
  how the captcha works
  
  1) check if session storage has clientId, if not, generate a new one (this is used to associate with the server)
  2) send clientId and gcaptcha response to captcha/verify
  
  */

  const onVerify = useCallback((response: string | null) => {
    if (response == null) {
      toastService.Intents.Errors.next("Failed to verify captcha.");
      return;
    }

    interactService.Intents.CaptchaVerify.next({ clientId: getClientId(), captchaResponse: response });
  }, [interactService.Intents.CaptchaVerify, toastService.Intents.Errors])

  return (
    <Modal onClose={() => interactService.Intents.ShowModal.next('none')}>
      <h2>Ahoy! Just need to verify your request real quick.</h2>
      <p>This shouldn't be painful... (You only need to do this once per session)</p>
      <br />
      <img src={noRobotsImage} alt="No robots allowed." style={{ width: '200px', height: '200px' }} />
      <br />
      <br />
      <div className="captcha">
        <ReCAPTCHA
          sitekey={key}
          theme="dark"
          onChange={onVerify}
        />
      </div>
    </Modal>
  )
}