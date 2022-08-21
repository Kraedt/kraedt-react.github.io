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

const catchAndLogAjaxError = () => (obs: Rx.Observable<any>) => obs.pipe(
  Rxo.catchError((err, caught) => {
    console.log(err)
    return caught;
  })
);

const catchAndToastErrorResponse = () => <T>(obs: Rx.Observable<T>) => obs.pipe(
  Rxo.tap((r: any) => {
    if (r?.response?.error !== undefined)
      ErrorsIntent.next(r.response.error)
  }),
);

export const ajaxGet = <T>(uri: string) => (obs: Rx.Observable<T>) => obs.pipe(
  Rxo.mergeMap(_ => ajax<T>({ method: "GET", url: apiUri(uri, _), crossDomain: true })),
  catchAndToastErrorResponse(),
  Rxo.pluck('response'),
  catchAndLogAjaxError(),
)

export const ajaxPost = (uri: string) => <T>(obs: Rx.Observable<T>) => obs.pipe(
  Rxo.mergeMap(_ => ajax<T>({ method: "POST", url: apiUri(uri, _), crossDomain: true })),
  catchAndLogAjaxError(),
  catchAndToastErrorResponse()
)

export const ajaxPostJson = (uri: string) => <T>(obs: Rx.Observable<T>) => obs.pipe(
  Rxo.mergeMap(_ => ajax<T>({ method: "POST", url: apiUri(uri), body: _, headers: { "content-type": "application/json" }, crossDomain: true })),
  catchAndLogAjaxError(),
  catchAndToastErrorResponse()
)