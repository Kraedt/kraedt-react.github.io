import * as Rx from 'rxjs';
import { Service } from './service-resolver';
import { ajaxPostJson } from '../rxjs-functions';
import { ContactMessage } from '../types/types';

export default class InteractService implements Service {
  constructor() {
    this.Intents.SendContact.pipe(
      ajaxPostJson('contact/send'),
    ).subscribe();
  }

  Intents = {
    SendContact: new Rx.Subject<ContactMessage>(),
  }
}