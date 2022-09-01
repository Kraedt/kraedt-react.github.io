import * as Rx from 'rxjs';
import * as Rxo from 'rxjs/operators';
import { Service } from './service-resolver';
import { ajaxPost, ajaxPostJson, mapCaptchaFailure } from '../rxjs-functions';
import { ContactMessage } from '../types/types';

export type ModalType = 'none' | 'captcha' | 'follow';

const showModal = new Rx.BehaviorSubject<ModalType>('none');
const captchaVerify = new Rx.Subject<{ clientId: string, captchaResponse: string }>();
const sendContact = new Rx.Subject<ContactMessage>();

/*

Two things I still need to figure out:

1) How / when to clear session storage, or if it can do so automatically?
  (I think this actually doesn't matter - if the client-side clientId is invalid, the server will request the client to do captcha)

2) How to re-fire the contact/send request after captcha verification

*/

export const shouldShowFollowPopupKey = 'shouldShowFollowPopup'

export default class InteractService implements Service {
  ShowModal: Rx.Observable<ModalType> = showModal;
  ContactResponse: Rx.Observable<boolean> = sendContact.pipe(
    ajaxPostJson('contact/send'),
    mapCaptchaFailure(() => showModal.next('captcha')),
  )

  constructor() {
    var location = window.location.href;
    var split = location.split('/');
    var currentPage = split[3];

    var dontShow = localStorage.getItem(shouldShowFollowPopupKey) === "false";
    if (!dontShow && ['music', 'music-creator-friendly'].includes(currentPage))
      showModal.next('follow');

    this.ContactResponse.subscribe();
    captchaVerify.pipe(
      ajaxPost('captcha/verify'),
      Rxo.tap(() => {
        showModal.next('none')
      }),
    ).subscribe();
  }

  Intents = {
    ShowModal: showModal,
    CaptchaVerify: captchaVerify,
    SendContact: sendContact,
  }
}