
//<script>
//    $(document).ready(function() {
//        $("#captcha-form").submit(function(e) {
//            e.preventDefault();
//            var clientId = getClientId();
//            $("input[name='clientId']").val(clientId);
//
//            $.ajax({
//                type: "POST",
//                url: "{{ site.download-site }}captcha/verify",
//                data: $("#captcha-form").serialize(),
//                success: function(data) {
//                    console.log("Captcha verification successful. Auto-submitting " + captchaCompleteAutoForm + " form again.")
//
//                    if (captchaCompleteAutoForm != ""){
//                        sessionStorage.setItem("receivedSuccess", true);
//                        $(captchaCompleteAutoForm).submit();
//                        toggleModalPopup('captcha-popup',false);
//                    }
//                },
//                error: function(err) {
//                    console.log(err);
//                    alert("There was an error verifying captcha status. Please try again later.")
//                }
//            });
//        });
//    });
//</script>

/*
    loadCaptcha();

    window.onclick = function(event) {
        if (modalIdsToCloseOnClick.includes(event.target.id)) {
            toggleModalPopup(event.target.id, false);
        }
        else if (event.target.className == "modal-content") {
            toggleModalPopup(event.target.parentElement.id, false);
        }
    }
*/

import InteractService from "../services/interact-service";
import { useService } from "../services/service-resolver";
import noRobotsImage from "../assets/images/norobots.jpg";

export const CaptchaPopup = () => {
  const interactService = useService(InteractService);

  const devSecret = "6LfUd4gUAAAAAPSaalhetzFMPD-rflobF69-FxDS";
  const prodSecret = "6LePdYgUAAAAAHtrf48MGpVTLTUERCj1h6296ynv";

  var key = document.location.hostname === "localhost" || document.location.hostname === "127.0.0.1"
    ? devSecret
    : prodSecret;

  //var loadCaptcha = function () {
  //  captchaContainer = grecaptcha.render('captcha', {
  //    'sitekey': key,
  //    'callback': autoSubmitCaptchaForm,
  //    'theme': 'dark'
  //  });
  //  document.getElementById("captcha").classList.add("div-center-fixed");
  //}

  return (<div id='captcha-popup' className='modal'>
    <span className="close" onClick={() => interactService.Intents.ShowCaptchaPopup.next(false)}>&times;</span>
    <div className='modal-content'>
      <h2>Ahoy! Just need to verify your request real quick.</h2>
      <p>This shouldn't be painful... (You only need to do this once per session)</p>
      <br />
      <img src={noRobotsImage} alt="No robots allowed." style={{ width: '200px', height: '200px' }} />
      <br />
      <br />
      <form id="captcha-form">
        <input type="hidden" name="clientId" />
        <div id="captcha"></div>
      </form>
    </div>
  </div>
  )
}