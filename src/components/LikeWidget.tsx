import { trackLike } from '../lib/analytics'

function handleLike() {
  trackLike()
  alert('תודה על הלייק!')
}

export function LikeWidget() {
  return (
    <div className="fixed right-2.5 bottom-2.5 flex items-center gap-2 rounded-2xl border border-line bg-white/90 p-2 shadow-soft backdrop-blur-sm sm:flex-col sm:gap-1 sm:p-3">
      <p className="text-sm font-medium text-subtle sm:text-base">אהבתם?</p>
      <button
        type="button"
        onClick={handleLike}
        className="rounded-full bg-primary-soft px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white sm:text-base"
      >
        👍 לייק
      </button>
    </div>
  )
}
