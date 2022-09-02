import * as Rx from 'rxjs';
import * as Rxo from 'rxjs/operators';
import { Service } from './service-resolver';
import { ajaxPost, ajaxPostJson, mapCaptchaFailure } from '../rxjs-functions';
import { ContactMessage } from '../types/types';
import { getClientId, isNullOrWhitespace } from '../functions';

export type ModalType = 'none' | 'captcha' | 'follow';

const showModal = new Rx.BehaviorSubject<ModalType>('none');
const captchaVerify = new Rx.Subject<{ clientId: string, captchaResponse: string }>();
const sendContact = new Rx.Subject<ContactMessage>();
const download = new Rx.Subject<number>();

/*
Things I still need to figure out:
1) How to re-fire the contact/send request after captcha verification
*/

export const shouldShowFollowPopupKey = 'shouldShowFollowPopup'

let instance: Service;

export default class InteractService implements Service {
  TypeName: string;

  ShowModal: Rx.Observable<ModalType> = showModal;
  ContactResponse: Rx.Observable<boolean> = sendContact.pipe(
    ajaxPostJson('contact/send'),
    mapCaptchaFailure(() => showModal.next('captcha')),
    Rxo.map(_ => isNullOrWhitespace(_?.response?.error) ?? true)
  )

  constructor() {
    this.TypeName = 'InteractService';

    if (!!instance)
      return;
    instance = this;

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

    download.pipe(
      Rxo.map(_ => ({ clientId: getClientId(), id: _ })),
      ajaxPost('download/request'),
      mapCaptchaFailure(() => showModal.next('captcha'))
    ).subscribe();
  }

  Intents = {
    ShowModal: showModal,
    CaptchaVerify: captchaVerify,
    SendContact: sendContact,
    Download: download
  }
}