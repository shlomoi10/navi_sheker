import { AnswerDisplay } from './components/AnswerDisplay'
import { Celebration } from './components/Celebration'
import { CookieConsent } from './components/CookieConsent'
import { Footer } from './components/Footer'
import GlowCursor from './components/GlowCursor'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { LikeWidget } from './components/LikeWidget'
import { DarkOverlay, LoadingOverlay } from './components/Overlays'
import { ProphetForm } from './components/ProphetForm'
import { TryAgainButton } from './components/TryAgainButton'
import { WandCard } from './components/WandCard'
import { useCookieConsent } from './hooks/useCookieConsent'
import { useProphet } from './hooks/useProphet'

export default function App() {
  const { tryAgainRef, form, answer, loadingMessage, isDarkOverlayVisible, isTryAgainVisible, celebration, resetMagic } =
    useProphet()

  const { hasConsent, accept } = useCookieConsent()

  return (
    <>
      <div inert={!hasConsent}>
        <Header />
        <WandCard />
        <main className="px-4">
          <Hero />
          <ProphetForm {...form} />
          <LoadingOverlay message={loadingMessage} />
          <DarkOverlay visible={isDarkOverlayVisible} />
          <AnswerDisplay {...answer} />
          <TryAgainButton ref={tryAgainRef} visible={isTryAgainVisible} onClick={resetMagic} />
        </main>
        <Footer />
        <LikeWidget />
      </div>
      <Celebration {...celebration} />
      {!hasConsent && <CookieConsent onAccept={accept} />}
      <GlowCursor
        aria-hidden="true"
        listenTarget="window"
        className="pointer-events-none"
        style={{ position: 'fixed', inset: 0, zIndex: 12 }}
        color="#8c7ee0"
        secondaryColor="#6fbfa3"
        trailLength={40}
        trailWidth={6}
        glowIntensity={1.4}
        blendMode="normal"
        maxDevicePixelRatio={1}
      />
    </>
  )
}
