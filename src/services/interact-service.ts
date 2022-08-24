import * as Rx from 'rxjs';
import * as Rxo from 'rxjs/operators';
import { Service } from './service-resolver';
import { ajaxPostJson } from '../rxjs-functions';
import { ContactMessage } from '../types/types';

const showCaptchaPopup = new Rx.BehaviorSubject<boolean>(true);

export default class InteractService implements Service {
  ShowCaptchaPopup: Rx.Observable<boolean> = showCaptchaPopup;

  constructor() {
    this.Intents.SendContact.pipe(
      ajaxPostJson('contact/send'),
    ).subscribe();
  }

  Intents = {
    ShowCaptchaPopup: showCaptchaPopup,
    SendContact: new Rx.Subject<ContactMessage>(),
  }
}