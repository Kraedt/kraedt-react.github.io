import styles from './Contact.module.scss';

export const Contact = () => {
  return (
    //<script>
    //    $(document).ready(function() {
    //        $("#contact-form").submit(function(e) {
    //            e.preventDefault();
    //            var clientId = getClientId();
    //            $("input[name='clientId']").val(clientId);
    //
    //            captchaCompleteAutoForm = "#contact-form";
    //
    //            $("#submitBtn").attr("disabled", true);
    //            setStatus("Sending...");
    //
    //            $.ajax({
    //                type: "POST",
    //                crossDomain: true,
    //                url: "{{ site.download-site }}contact",
    //                data: $("#contact-form").serialize(),
    //                success: function(response) {
    //		    console.log("contact response", response.details);
    //                    if (response == "success") {
    //                        setStatus("Message sent successfully.")
    //                    }
    //                    else {
    //                        setStatus("There was a problem sending your message. Please use the email address below.", true);
    //                        $("#submitBtn").attr("disabled", false);
    //                    }
    //                },
    //                error: function(err) {
    //                    console.log("Error: " + JSON.stringify(err));
    //                    toggleModalPopup('captcha-popup', true);
    //                    $("#submitBtn").attr("disabled", false);
    //                    setStatus("Please complete the captcha.")
    //                    return false;
    //                }
    //            });
    //        });
    //    });
    //
    //    function setStatus(status, error = false) {
    //        $("#contact-status").text(status);
    //
    //        //if (error)
    //        //    cs.attr("class", "error");
    //    }
    //</script>
    <>
      <h2>Contact</h2>
      <p id="contact-status"></p>
      <div className={styles.contactForm}>
        <form id="contact-form">
          <input type="hidden" name="clientId" />
          <small><em>Email is not required, but if you want a reply, be sure to include it.</em></small>
          <input className="form-control" type="text" name="name" maxLength={40} placeholder="Name or Email" />
          <br />
          <textarea className="form-control" name="message" draggable="false" rows={6} placeholder="Message*" maxLength={360} required></textarea><br />
          <button className="float-right">Submit</button>
        </form>
      </div>
      <br />
      <h2>Form not working? Email me directly at:</h2>
      <h3>kraedt@gmail.com</h3>
    </>

  )
}