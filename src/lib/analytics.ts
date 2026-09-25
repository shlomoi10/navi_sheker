declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackLike(): void {
  window.gtag?.('event', 'like_button_clicked', {
    event_category: 'engagement',
    event_label: 'like_button',
  })
}
