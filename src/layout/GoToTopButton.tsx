import { goToTop } from "../functions"

export const GoToTopButton = () => {
  return (
    <div className="corner-controls">
      <button onClick={() => goToTop()}>
        <i className="fas fa-arrow-up fa-2x" />
      </button>
    </div>
  )
}