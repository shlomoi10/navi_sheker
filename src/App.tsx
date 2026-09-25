import { AnswerDisplay } from './components/AnswerDisplay'
import { FallingLogos } from './components/FallingLogos'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { LikeWidget } from './components/LikeWidget'
import { DarkOverlay, LoadingOverlay } from './components/Overlays'
import { ProphetForm } from './components/ProphetForm'
import { TryAgainButton } from './components/TryAgainButton'
import { WandCard } from './components/WandCard'
import { useMouseTrail } from './hooks/useMouseTrail'
import { useProphet } from './hooks/useProphet'

const MOUSE_TRAIL_CLASS =
  'pointer-events-none fixed z-12 size-[15px] animate-glitter rounded-full bg-white/95 shadow-[0_0_14px_rgb(140_126_224/55%)]'

export default function App() {
  const { tryAgainRef, form, answer, loadingMessage, isDarkOverlayVisible, isTryAgainVisible, fallingLogos, resetMagic } =
    useProphet()
  useMouseTrail(MOUSE_TRAIL_CLASS)

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
    </>
  )
}
