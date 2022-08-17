import * as datefns from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { dateToId } from '../functions';
import { useObservable } from '../rxjs-functions';
import BudgetService from '../services/budget-service';
import { useService } from '../services/service-resolver';
import styles from './MonthSelector.module.scss'

export const MonthSelector = () => {
  const closeMonthSelector = (ref: React.RefObject<any>) => ref.current.removeAttribute('open');

  const [selOffset, setSelOffset] = useState(0);
  const [viewOffset, setViewOffset] = useState(0);

  const budgetService = useService(BudgetService);
  const { Month: monthIntent } = budgetService.Intents;
  const budgetedMonths = useObservable(budgetService.BudgetedMonths) ?? [];
  const detailsRef = useRef(null);

  let current = new Date();
  let selectedDate = datefns.addMonths(current, selOffset);
  let selectedId = dateToId(selectedDate);
  let dates = [-4, -3, -2, -1, 0, 1, 2, 3, 4].map(_ => {
    let offset = _ + viewOffset;
    return { month: datefns.addMonths(current, offset), offset: _ }
  });

  useEffect(() => {
    const onMouseUp = (e: any) => {
      if (e.button === 2) return;
      if (!(detailsRef?.current as any).contains(e.target)) {
        closeMonthSelector(detailsRef);
      }
    };

    document.addEventListener('mouseup', onMouseUp);
    return () => document.removeEventListener('mouseup', onMouseUp);
  }, []);

  let offsetView = (num: number) => setViewOffset(viewOffset + num);
  let selectMonth = (offset: number) => {
    setSelOffset(offset);
    monthIntent.next(dateToId(datefns.addMonths(new Date(), offset)));
    closeMonthSelector(detailsRef);
  }

  return (
    <details id='monthSelector' className={styles.monthSelector} ref={detailsRef}>
      <summary>{datefns.format(selectedDate, 'MMMM yyyy')}</summary>
      <ul>
        <button onClick={() => offsetView(-9)}><i className='fa fa-chevron-left' /></button>
        {dates.map(({ month, offset }) => {
          let monthId = dateToId(month);
          return (
            <li className={styles.month} key={monthId}
              onClick={() => selectMonth(offset + viewOffset)}
              data-selected={selectedId === monthId ? 'true' : null}
              data-budgeted={budgetedMonths.includes(monthId) ? 'true' : null}>
              {datefns.format(month, 'MMM yyyy')}
              {datefns.isToday(month) ? <span className={styles.today}>Today</span> : null}
            </li>
          )
        })}
        <button onClick={() => offsetView(9)}><i className='fa fa-chevron-right' /></button>
      </ul>
    </details >
  )
}