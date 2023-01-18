import { Navigate, useParams } from "react-router-dom"

interface Props {
  fn: (key: string | undefined) => string;
  doRedirect?: () => boolean;
}

export const FunctionalRedirect = ({ fn, doRedirect = () => true }: Props) => {
  const { key } = useParams();

  return doRedirect()
    ? <Navigate to={fn(key)} replace />
    : <p className="w-100 text-center">Redirecting...</p>
}