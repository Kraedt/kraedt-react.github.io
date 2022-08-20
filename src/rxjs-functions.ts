import * as Rx from 'rxjs';
import * as Rxo from 'rxjs/operators';
import { useEffect, useState } from "react";
import { ajax } from 'rxjs/ajax';
import { apiUri } from './functions';
import { ErrorsIntent } from './services/toast-service';

export const useObservable = <T,>(observable: Rx.Observable<T>) => {
  const [value, setValue] = useState<T>();

  useEffect(() => {
    const subscription = observable.subscribe((v) => {
      setValue(v);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [observable]);

  return value;
};

export const unpluck = (val: string) => (obs: Rx.Observable<any>) => obs.pipe(Rxo.map(x => ({ [val]: x })))

export const catchAndToastError = () => (obs: Rx.Observable<any>) => obs.pipe(
  Rxo.catchError((err, caught) => {
    ErrorsIntent.next(err.message);
    return caught;
  })
);

export const ajaxGet = <T,>(uri: string) => (obs: Rx.Observable<any>) => obs.pipe(
  Rxo.mergeMap(_ => ajax<T>({ method: "GET", url: apiUri(uri, _), crossDomain: true })),
  Rxo.pluck('response'),
  catchAndToastError(),
)

export const ajaxPost = (uri: string) => (obs: Rx.Observable<any>) => obs.pipe(
  Rxo.mergeMap(_ => ajax({ method: "POST", url: apiUri(uri, _), crossDomain: true })),
  catchAndToastError(),
)

export const ajaxPostJson = (uri: string) => (obs: Rx.Observable<any>) => obs.pipe(
  Rxo.mergeMap(_ => ajax({ method: "POST", url: apiUri(uri), body: _, headers: { "content-type": "application/json" }, crossDomain: true })),
  catchAndToastError(),
)