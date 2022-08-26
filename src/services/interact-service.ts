import * as Rx from 'rxjs';
import * as Rxo from 'rxjs/operators';
import { Service } from './service-resolver';
import { ajaxPost, ajaxPostJson, mapCaptchaFailure } from '../rxjs-functions';
import { ContactMessage } from '../types/types';

const showCaptchaPopup = new Rx.BehaviorSubject<boolean>(false);
const captchaVerify = new Rx.Subject<{ clientId: string, captchaResponse: string }>();
const sendContact = new Rx.Subject<ContactMessage>();

/*

Two things I still need to figure out:

1) How / when to clear session storage, or if it can do so automatically?

2) How to re-fire the contact/send request after captcha verification

*/

export default class InteractService implements Service {
  ShowCaptchaPopup: Rx.Observable<boolean> = showCaptchaPopup;
  ContactResponse: Rx.Observable<boolean> = sendContact.pipe(
    ajaxPostJson('contact/send'),
    mapCaptchaFailure(() => showCaptchaPopup.next(true)),
  )

  constructor() {
    this.ContactResponse.subscribe();
    captchaVerify.pipe(
      ajaxPost('captcha/verify'),
      Rxo.tap(() => {
        sessionStorage.setItem("captchaVerified", "true");
        showCaptchaPopup.next(false)
      }),
    ).subscribe();
  }

  Intents = {
    ShowCaptchaPopup: showCaptchaPopup,
    CaptchaVerify: captchaVerify,
    SendContact: sendContact,
  }
}