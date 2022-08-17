import { PropsWithChildren, useEffect } from "react"
import { isNullOrWhitespace } from "../functions"

type Props = PropsWithChildren<{ title?: string }>

export const Page = ({ children, title }: Props) => {
  useEffect(() => {
    if (!isNullOrWhitespace(title))
      document.title = title!
  }, [title])

  return (
    <>
      {children}
    </>
  );
}