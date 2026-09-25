import { AnswerDisplay } from './components/AnswerDisplay'
import { FallingLogos } from './components/FallingLogos'
import GlowCursor from './components/GlowCursor'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { LikeWidget } from './components/LikeWidget'
import { DarkOverlay, LoadingOverlay } from './components/Overlays'
import { ProphetForm } from './components/ProphetForm'
import { TryAgainButton } from './components/TryAgainButton'
import { WandCard } from './components/WandCard'
import { useProphet } from './hooks/useProphet'

export default function App() {
  const { tryAgainRef, form, answer, loadingMessage, isDarkOverlayVisible, isTryAgainVisible, fallingLogos, resetMagic } =
    useProphet()

  return (
    <>
      <Header />
      <WandCard />
      <main className="px-4 pb-40 sm:pb-44">
        <Hero />
        <ProphetForm {...form} />
        <LoadingOverlay message={loadingMessage} />
        <DarkOverlay visible={isDarkOverlayVisible} />
        <AnswerDisplay {...answer} />
        <TryAgainButton ref={tryAgainRef} visible={isTryAgainVisible} onClick={resetMagic} />
      </main>
      <LikeWidget />
      <FallingLogos logos={fallingLogos} />
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
