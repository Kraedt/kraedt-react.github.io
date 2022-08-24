import { useCallback, useState } from 'react';
import { getClientId, isNullOrWhitespace } from '../../functions';
import { useObservable } from '../../rxjs-functions';
import InteractService from '../../services/interact-service';
import { useService } from '../../services/service-resolver';
import { ContactMessage } from '../../types/types';
import { Page } from '../Page';
import styles from './Contact.module.scss';

const initialState = { name: '', message: '' }

export const Contact = () => {
  const interactService = useService(InteractService);
  const contactResponse = useObservable(interactService.ContactResponse);

  const [state, setState] = useState<Partial<ContactMessage>>(initialState);

  const send = useCallback(() => {
    interactService.Intents.SendContact.next({ ...initialState, ...state, clientId: getClientId() })
  }, [interactService.Intents.SendContact, state]);

  return (
    <Page title="Kraedt - Contact">
      <br />
      {contactResponse !== undefined && (contactResponse ? <p className="text-positive">Message sent successfully.</p> : <p className="text-negative">Failed to send message. Please try again later.</p>)}
      <div className={styles.contactForm}>
        <small><em>Email is not required, but if you want a reply, be sure to include it.</em></small>
        <input type="text" maxLength={40} placeholder="Name or Email" value={state?.name} onChange={e => setState({ ...state, ...{ name: e.target.value } })} />
        <textarea rows={6} placeholder="Message*" maxLength={360} required value={state?.message} onChange={e => setState({ ...state, ...{ message: e.target.value } })}></textarea><br />
        <button className="float-right" onClick={send} data-disabled={contactResponse !== undefined || isNullOrWhitespace(state.message)}>Submit</button>
      </div>
      <h2>Alternatively, feel free to email me directly at:</h2>
      <h3>kraedt@gmail.com</h3>
    </Page>
  )
}