import { PropsWithChildren, useState } from 'react';

interface Props extends PropsWithChildren<any> {
  focusChildren: boolean;
  onBlur: (value: string) => void;
  initialValue?: string;
}

export const TextInput = ({ focusChildren, children, onBlur, initialValue }: Props) => {
  const [value, setValue] = useState(initialValue ?? '');
  const [focused, setFocused] = useState(false);

  return (
    <div className='textInput'>
      <input type='text'
        onClick={(e: any) => e.target.select()}
        placeholder='Budget Item Label'
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e: any) => e.key === "Enter" && e.target.blur()}
        onFocus={() => setFocused(true)}
        onBlur={(e: any) => {
          onBlur && onBlur(e.target.value);
          setFocused(false);
        }}
        value={value} />
      {focusChildren ? (focused && children) : children}
    </div>
  )
}