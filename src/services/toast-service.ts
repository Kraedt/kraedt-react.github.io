import * as Rx from 'rxjs';
import * as Rxo from 'rxjs/operators';
import { Service } from './service-resolver';
import * as datefns from 'date-fns';
import * as ld from 'lodash';

export const ErrorsIntent = new Rx.Subject<string>();

export type Notification = { message: string, expireTime: Date }

export default class ToastService implements Service {
  Errors = ErrorsIntent.asObservable().pipe(
    Rxo.map(x => ({
      message: x,
      expireTime: datefns.addSeconds(new Date(), 1)
    })),
    Rxo.combineLatestWith(Rx.interval(5000).pipe(Rxo.startWith({}))),
    Rxo.map(x => x[0]),
    Rxo.scan((a, c) => {
      let filtered = a.filter(x => x.expireTime > new Date());
      if (c.expireTime < new Date())
        return filtered;
      return ld.uniqBy([...filtered, c], x => x.expireTime);
    }, [] as Notification[]),
    Rxo.map(x => x.map(x => x.message)),
  );

  Intents = {
    Errors: ErrorsIntent,
  }
}