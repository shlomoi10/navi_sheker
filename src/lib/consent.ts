// Must match the key read by the inline consent script in index.html
export const CONSENT_STORAGE_KEY = 'navi_sheker_cookie_consent'
const CONSENT_VERSION = 1

export interface StoredConsent {
  choice: 'all'
  version: number
  date: string
}

export function readConsent(): StoredConsent | null {
  try {
    const stored = JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY) ?? 'null') as StoredConsent | null
    return stored?.version === CONSENT_VERSION && stored.choice === 'all' ? stored : null
  } catch {
    return null
  }
}

export function saveConsent(): StoredConsent {
  const consent: StoredConsent = { choice: 'all', version: CONSENT_VERSION, date: new Date().toISOString() }
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent))
  } catch {
    // Storage unavailable (e.g. private mode) – consent still applies for this visit
  }
  window.gtag?.('consent', 'update', { analytics_storage: 'granted' })
  return consent
}
