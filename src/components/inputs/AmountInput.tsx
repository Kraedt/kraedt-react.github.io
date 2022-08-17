import { useState } from 'react';
import { intlAmountFormat, clamp, evaluateMath, convertToFloat as convertToFixed } from '../../functions';

interface Props {
  onChange: (value: number) => void;
  initialValue?: number;
}

export const AmountInput = ({ onChange, initialValue }: Props) => {
  const [focused, setFocused] = useState(false);
  const [changeValue, setChangeValue] = useState(initialValue ?? 0);

  const formattedValue = focused ? changeValue.toString() : intlAmountFormat(changeValue);

  const change = (val: number) => {
    setChangeValue(val ? val : 0);
  }
  const submit = (target: any, doBlur: boolean) => {
    let val = clamp(convertToFixed(evaluateMath(target.value), 2), 0, Math.pow(2, 31));
    change(val);
    onChange(val);
    setFocused(false);

    if (doBlur)
      target.blur();
  }

  return (
    <input type='text' data-type='amount'
      onClick={(e: any) => e.target.select()}
      placeholder={formattedValue}
      onFocus={() => setFocused(true)}
      onBlur={e => submit(e.target, false)}
      onChange={(e: any) => change(e.target.value)}
      onKeyPress={(e: any) => e.key === "Enter" && e.target.blur()}
      value={formattedValue} />
  )
}