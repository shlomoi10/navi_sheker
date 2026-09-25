import { Cookie } from 'lucide-react'

interface CookieConsentProps {
  onAccept: () => void
}

export function CookieConsent({ onAccept }: CookieConsentProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/30 p-4 backdrop-blur-md animate-fade-in sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-text"
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-line bg-white p-6 text-right shadow-card sm:p-8"
      >
        <div className="pointer-events-none absolute -top-16 -left-16 size-44 rounded-full bg-primary-soft blur-2xl" />
        <div className="pointer-events-none absolute -right-12 -bottom-20 size-40 rounded-full bg-mint-soft blur-2xl" />

        <div className="relative">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <Cookie className="size-6" strokeWidth={2} aria-hidden="true" />
            </span>
            <h2 id="cookie-consent-title" className="text-xl font-bold sm:text-2xl">
              רגע לפני שהנביא עונה...
            </h2>
          </div>

          <p id="cookie-consent-text" className="leading-relaxed text-subtle">
            האתר משתמש בעוגיות ובכלי Google Analytics כדי להבין איך משתמשים בו ולשפר אותו. כדי להמשיך לאתר יש לאשר את
            השימוש בעוגיות.
          </p>

          <button
            type="button"
            autoFocus
            onClick={onAccept}
            className="mt-6 w-full rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-[0_8px_20px_rgb(140_126_224/30%)] transition hover:-translate-y-px hover:bg-primary-hover focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none sm:w-auto"
          >
            מאשר/ת עוגיות
          </button>
        </div>
      </div>
    </div>
  )
}
