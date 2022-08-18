import * as Rx from 'rxjs';
import * as Rxo from 'rxjs/operators';
import { Service } from './service-resolver';
import { ajaxGet, ajaxPost, ajaxPostJson } from '../rxjs-functions';
import { Song } from '../types/types';

//const monthIntent = new Rx.Subject<string>();

export default class MusicService implements Service {
  Songs: Rx.Observable<Song[]> = Rx.EMPTY.pipe(
    Rxo.startWith(undefined),
    ajaxGet('meta/songs'),
  )

  //constructor() {
  //createBudgetIntent.pipe(
  //  Rxo.map(_ => ({ budgetId: _ })),
  //  ajaxPost('budget/createBudget')
  //).subscribe();
  //}

  Intents = {
    //Month: monthIntent,
  }
}