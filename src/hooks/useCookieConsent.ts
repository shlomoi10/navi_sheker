import { useCallback, useEffect, useState } from 'react'
import { readConsent, saveConsent, type StoredConsent } from '../lib/consent'

export function useCookieConsent() {
  const [consent, setConsent] = useState<StoredConsent | null>(readConsent)
  const hasConsent = consent !== null

  const accept = useCallback(() => setConsent(saveConsent()), [])

  useEffect(() => {
    if (hasConsent) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [hasConsent])

  return { hasConsent, accept }
}
