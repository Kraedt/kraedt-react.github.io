import * as Rx from 'rxjs';
import * as Rxo from 'rxjs/operators';
import { Budget, BudgetItem, ViewMode } from '../types/budget-types';
import { Service } from './service-resolver';
import { dateToId } from '../functions';
import { ajaxGet, ajaxPost, ajaxPostJson, unpluck } from '../rxjs-functions';
import * as ld from 'lodash';

const viewModeIntent = new Rx.Subject<ViewMode>();
const monthIntent = new Rx.Subject<string>();

interface BudgetRequest {
  budgetId: string;
  groupId: string;
  itemId: string;
  item: BudgetItem;
  title: string;
}

const createBudgetIntent = new Rx.Subject<string>();
const addGroupIntent = new Rx.Subject<string>();
const renameGroupIntent = new Rx.Subject<Pick<BudgetRequest, 'budgetId' | 'groupId' | 'title'>>();
const deleteGroupIntent = new Rx.Subject<Pick<BudgetRequest, 'budgetId' | 'groupId'>>();
const addItemIntent = new Rx.Subject<Pick<BudgetRequest, 'budgetId' | 'groupId'>>();
const editItemIntent = new Rx.Subject<Pick<BudgetRequest, 'budgetId' | 'groupId' | 'item'>>();
const deleteItemIntent = new Rx.Subject<Pick<BudgetRequest, 'budgetId' | 'groupId' | 'itemId'>>();

export default class BudgetService implements Service {
  ViewModel = viewModeIntent.asObservable();
  Month = monthIntent.asObservable();
  BudgetedMonths: Rx.Observable<string[]> = Rx.EMPTY.pipe(
    Rxo.startWith({}),
    ajaxGet('budget/getBudgetedMonths'),
  )
  CurrentBudget = monthIntent.pipe(
    Rxo.startWith(dateToId(new Date())),
    Rxo.map(_ => ({ budgetId: _ })),
    Rxo.mergeWith(addGroupIntent.pipe(unpluck('budgetId'))),
    Rxo.mergeWith(renameGroupIntent),
    Rxo.mergeWith(deleteGroupIntent),
    Rxo.mergeWith(addItemIntent),
    Rxo.mergeWith(editItemIntent),
    Rxo.mergeWith(deleteItemIntent),
    Rxo.debounceTime(250),
    ajaxGet('budget/getBudget'),
  ) as Rx.Observable<Budget>

  CurrentBudgetMetadata = this.CurrentBudget.pipe(
    Rxo.filter(x => !!x),
    Rxo.map(budget => {
      if (!budget)
        return null;

      const incomeTotal = ld.sumBy(budget!.categories.find(x => x.title.toLowerCase() === 'income')?.budgetItems, x => x.plannedAmount);
      return ({
        incomeTotal,
        budgetTotal: ld.sumBy(budget!.categories.filter(x => !x.reserved).flatMap(x => x.budgetItems), x => x.plannedAmount)
      })
    })
  )

  constructor() {
    createBudgetIntent.pipe(
      Rxo.map(_ => ({ budgetId: _ })),
      ajaxPost('budget/createBudget')
    ).subscribe();
    addGroupIntent.pipe(
      Rxo.map(_ => ({ budgetId: _ })),
      ajaxPost('budget/addGroup')
    ).subscribe();
    renameGroupIntent.pipe(
      ajaxPost('budget/renameGroup')
    ).subscribe();
    deleteGroupIntent.pipe(
      ajaxPost('budget/deleteGroup')
    ).subscribe();
    addItemIntent.pipe(
      ajaxPost('budget/addItem')
    ).subscribe();
    editItemIntent.pipe(
      Rxo.map(_ => ({
        id: _.item.id,
        budgetId: _.budgetId,
        groupId: _.groupId,
        label: _.item.label,
        plannedAmount: _.item.plannedAmount
      })),
      ajaxPostJson('budget/editItem')
    ).subscribe();
    deleteItemIntent.pipe(
      ajaxPost('budget/deleteItem')
    ).subscribe();
  }

  Intents = {
    ViewMode: viewModeIntent,
    Month: monthIntent,
    CreateBudget: createBudgetIntent,
    AddGroup: addGroupIntent,
    RenameGroup: renameGroupIntent,
    DeleteGroup: deleteGroupIntent,
    AddItem: addItemIntent,
    EditItem: editItemIntent,
    DeleteItem: deleteItemIntent,
  }
}